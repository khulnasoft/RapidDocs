import decompress from "decompress";
import { cp, readFile, readdir, rm, rmdir } from "fs/promises";
import tmp from "tmp-promise";

import { RAPIDDOCSIGNORE_FILENAME } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { loggingExeca } from "@khulnasoft/logging-execa";
import { TaskContext } from "@khulnasoft/task-context";

export declare namespace LocalTaskHandler {
    export interface Init {
        context: TaskContext;
        absolutePathToTmpOutputDirectory: AbsoluteFilePath;
        absolutePathToTmpSnippetJSON: AbsoluteFilePath | undefined;
        absolutePathToLocalSnippetTemplateJSON: AbsoluteFilePath | undefined;
        absolutePathToLocalOutput: AbsoluteFilePath;
        absolutePathToLocalSnippetJSON: AbsoluteFilePath | undefined;
        absolutePathToTmpSnippetTemplatesJSON: AbsoluteFilePath | undefined;
    }
}

export class LocalTaskHandler {
    private context: TaskContext;
    private absolutePathToTmpOutputDirectory: AbsoluteFilePath;
    private absolutePathToTmpSnippetJSON: AbsoluteFilePath | undefined;
    private absolutePathToTmpSnippetTemplatesJSON: AbsoluteFilePath | undefined;
    private absolutePathToLocalSnippetTemplateJSON: AbsoluteFilePath | undefined;
    private absolutePathToLocalOutput: AbsoluteFilePath;
    private absolutePathToLocalSnippetJSON: AbsoluteFilePath | undefined;

    constructor({
        context,
        absolutePathToTmpOutputDirectory,
        absolutePathToTmpSnippetJSON,
        absolutePathToLocalSnippetTemplateJSON,
        absolutePathToLocalOutput,
        absolutePathToLocalSnippetJSON,
        absolutePathToTmpSnippetTemplatesJSON
    }: LocalTaskHandler.Init) {
        this.context = context;
        this.absolutePathToLocalOutput = absolutePathToLocalOutput;
        this.absolutePathToTmpOutputDirectory = absolutePathToTmpOutputDirectory;
        this.absolutePathToTmpSnippetJSON = absolutePathToTmpSnippetJSON;
        this.absolutePathToLocalSnippetJSON = absolutePathToLocalSnippetJSON;
        this.absolutePathToLocalSnippetTemplateJSON = absolutePathToLocalSnippetTemplateJSON;
        this.absolutePathToTmpSnippetTemplatesJSON = absolutePathToTmpSnippetTemplatesJSON;
    }

    public async copyGeneratedFiles(): Promise<void> {
        if (await this.isRapiddocsIgnorePresent()) {
            await this.copyGeneratedFilesWithRapiddocsIgnore();
        } else {
            await this.copyGeneratedFilesNoRapiddocsIgnore();
        }
        if (
            this.absolutePathToTmpSnippetJSON != null &&
            this.absolutePathToLocalSnippetJSON != null &&
            (await doesPathExist(this.absolutePathToTmpSnippetJSON))
        ) {
            await this.copySnippetJSON({
                absolutePathToTmpSnippetJSON: this.absolutePathToTmpSnippetJSON,
                absolutePathToLocalSnippetJSON: this.absolutePathToLocalSnippetJSON
            });
        }

        if (
            this.absolutePathToTmpSnippetTemplatesJSON != null &&
            this.absolutePathToLocalSnippetTemplateJSON != null &&
            (await doesPathExist(this.absolutePathToTmpSnippetTemplatesJSON))
        ) {
            await this.copySnippetJSON({
                absolutePathToTmpSnippetJSON: this.absolutePathToTmpSnippetTemplatesJSON,
                absolutePathToLocalSnippetJSON: this.absolutePathToLocalSnippetTemplateJSON
            });
        }
    }

    private async isRapiddocsIgnorePresent(): Promise<boolean> {
        const absolutePathToRapiddocsignore = AbsoluteFilePath.of(
            join(this.absolutePathToLocalOutput, RelativeFilePath.of(RAPIDDOCSIGNORE_FILENAME))
        );
        return await doesPathExist(absolutePathToRapiddocsignore);
    }

    private async copyGeneratedFilesWithRapiddocsIgnore(): Promise<void> {
        // Create temp directory to resolve .rapiddocsignore
        const tmpOutputResolutionDir = AbsoluteFilePath.of((await tmp.dir({})).path);

        // Read all .rapiddocsignore paths
        const absolutePathToRapiddocsignore = AbsoluteFilePath.of(
            join(this.absolutePathToLocalOutput, RelativeFilePath.of(RAPIDDOCSIGNORE_FILENAME))
        );
        const rapiddocsIgnorePaths = await getRapiddocsIgnorePaths({ absolutePathToRapiddocsignore });

        // Copy files from local output to tmp directory
        await cp(this.absolutePathToLocalOutput, tmpOutputResolutionDir, { recursive: true });

        // In tmp directory initialize a `.git` directory
        await this.runGitCommand(["init"], tmpOutputResolutionDir);
        await this.runGitCommand(["add", "."], tmpOutputResolutionDir);

        const response = await this.runGitCommand(["config", "--list"], tmpOutputResolutionDir);
        if (!response.includes("user.name")) {
            await this.runGitCommand(["config", "user.name", "khulnasoft"], tmpOutputResolutionDir);
            await this.runGitCommand(["config", "user.email", "info@buildwithrapiddocs.com"], tmpOutputResolutionDir);
        }
        await this.runGitCommand(["commit", "--allow-empty", "-m", '"init"'], tmpOutputResolutionDir);

        // Stage deletions `git rm -rf .`
        await this.runGitCommand(["rm", "-rf", "."], tmpOutputResolutionDir);

        // Copy all files from generated temp dir
        await this.copyGeneratedFilesToDirectory(tmpOutputResolutionDir);

        // Undo changes to rapiddocsignore paths
        await this.runGitCommand(["reset", "--", ...rapiddocsIgnorePaths], tmpOutputResolutionDir);
        await this.runGitCommand(["restore", "."], tmpOutputResolutionDir);

        // Delete local output directory and copy all files from the generated directory
        await rmdir(this.absolutePathToLocalOutput, { recursive: true });
        await cp(tmpOutputResolutionDir, this.absolutePathToLocalOutput, { recursive: true });
    }

    /**
     * If no `.rapiddocsignore` is present we can delete the local output directory entirely and
     * copy the generated output from the tmp directory.
     */
    private async copyGeneratedFilesNoRapiddocsIgnore(): Promise<void> {
        this.context.logger.debug(`rm -rf ${this.absolutePathToLocalOutput}`);
        await rm(this.absolutePathToLocalOutput, { force: true, recursive: true });
        await this.copyGeneratedFilesToDirectory(this.absolutePathToLocalOutput);
    }

    private async copyGeneratedFilesToDirectory(outputPath: AbsoluteFilePath): Promise<void> {
        const [firstLocalOutputItem, ...remaininglocalOutputItems] = await readdir(
            this.absolutePathToTmpOutputDirectory
        );
        if (firstLocalOutputItem == null) {
            return;
        }
        this.context.logger.debug(`Copying generated files to ${outputPath}`);
        if (firstLocalOutputItem.endsWith(".zip")) {
            await decompress(
                join(this.absolutePathToTmpOutputDirectory, RelativeFilePath.of(firstLocalOutputItem)),
                outputPath
            );
            for (const localOutputItem of remaininglocalOutputItems) {
                await cp(
                    join(this.absolutePathToTmpOutputDirectory, RelativeFilePath.of(localOutputItem)),
                    join(outputPath, RelativeFilePath.of(localOutputItem)),
                    { recursive: true }
                );
            }
        } else {
            await cp(this.absolutePathToTmpOutputDirectory, outputPath, { recursive: true });
        }
    }

    private async copySnippetJSON({
        absolutePathToTmpSnippetJSON,
        absolutePathToLocalSnippetJSON
    }: {
        absolutePathToTmpSnippetJSON: AbsoluteFilePath;
        absolutePathToLocalSnippetJSON: AbsoluteFilePath;
    }): Promise<void> {
        this.context.logger.debug(`Copying generated snippets to ${absolutePathToLocalSnippetJSON}`);
        await cp(absolutePathToTmpSnippetJSON, absolutePathToLocalSnippetJSON);
    }

    private async runGitCommand(options: string[], cwd: AbsoluteFilePath): Promise<string> {
        const response = await loggingExeca(this.context.logger, "git", options, {
            cwd,
            doNotPipeOutput: true
        });
        return response.stdout;
    }
}

const NEW_LINE_REGEX = /\r?\n/;

async function getRapiddocsIgnorePaths({
    absolutePathToRapiddocsignore
}: {
    absolutePathToRapiddocsignore: AbsoluteFilePath;
}): Promise<string[]> {
    const rapiddocsIgnoreFileContents = (await readFile(absolutePathToRapiddocsignore)).toString();
    return [
        RAPIDDOCSIGNORE_FILENAME,
        ...rapiddocsIgnoreFileContents
            .trim()
            .split(NEW_LINE_REGEX)
            .filter((line) => !line.startsWith("#") && line.length > 0)
    ];
}
