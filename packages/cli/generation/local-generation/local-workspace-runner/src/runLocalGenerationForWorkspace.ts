import chalk from "chalk";
import os from "os";
import path from "path";
import tmp from "tmp-promise";

import { rapiddocsConfigJson, generatorsYml } from "@khulnasoft/configuration";
import { TaskContext } from "@khulnasoft/task-context";
import {
    AbstractAPIWorkspace,
    getBaseOpenAPIWorkspaceSettingsFromGeneratorInvocation
} from "@khulnasoft/workspace-loader";

import { writeFilesToDiskAndRunGenerator } from "./runGenerator";

export async function runLocalGenerationForWorkspace({
    projectConfig,
    workspace,
    generatorGroup,
    keepDocker,
    context
}: {
    projectConfig: rapiddocsConfigJson.ProjectConfig;
    workspace: AbstractAPIWorkspace<unknown>;
    generatorGroup: generatorsYml.GeneratorGroup;
    keepDocker: boolean;
    context: TaskContext;
}): Promise<void> {
    const workspaceTempDir = await getWorkspaceTempDir();

    const results = await Promise.all(
        generatorGroup.generators.map(async (generatorInvocation) => {
            return context.runInteractiveTask({ name: generatorInvocation.name }, async (interactiveTaskContext) => {
                if (generatorInvocation.absolutePathToLocalOutput == null) {
                    interactiveTaskContext.failWithoutThrowing(
                        "Cannot generate because output location is not local-file-system"
                    );
                } else {
                    const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace(
                        { context },
                        getBaseOpenAPIWorkspaceSettingsFromGeneratorInvocation(generatorInvocation)
                    );

                    await writeFilesToDiskAndRunGenerator({
                        organization: projectConfig.organization,
                        absolutePathToRapiddocsConfig: projectConfig._absolutePath,
                        workspace: rapiddocsWorkspace,
                        generatorInvocation,
                        absolutePathToLocalOutput: generatorInvocation.absolutePathToLocalOutput,
                        absolutePathToLocalSnippetJSON: undefined,
                        absolutePathToLocalSnippetTemplateJSON: undefined,
                        audiences: generatorGroup.audiences,
                        workspaceTempDir,
                        keepDocker,
                        context: interactiveTaskContext,
                        irVersionOverride: generatorInvocation.irVersionOverride,
                        outputVersionOverride: undefined,
                        writeUnitTests: false,
                        generateOauthClients: false,
                        generatePaginatedClients: false
                    });
                    interactiveTaskContext.logger.info(
                        chalk.green("Wrote files to " + generatorInvocation.absolutePathToLocalOutput)
                    );
                }
            });
        })
    );

    if (results.some((didSucceed) => !didSucceed)) {
        context.failAndThrow();
    }
}

export async function getWorkspaceTempDir(): Promise<tmp.DirectoryResult> {
    return tmp.dir({
        // use the /private prefix on osx so that docker can access the tmpdir
        // see https://stackoverflow.com/a/45123074
        tmpdir: os.platform() === "darwin" ? path.join("/private", os.tmpdir()) : undefined,
        prefix: "rapiddocs"
    });
}
