import { writeFile } from "fs/promises";
import path from "path";

import { Audiences } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, stringifyLargeObject } from "@khulnasoft/fs-utils";
import { Project } from "@khulnasoft/project-loader";
import { convertIrToFdrApi } from "@khulnasoft/register";

import { CliContext } from "../../cli-context/CliContext";
import { generateIrForRapiddocsWorkspace } from "../generate-ir/generateIrForRapiddocsWorkspace";

export async function generateFdrApiDefinitionForWorkspaces({
    project,
    outputFilepath,
    cliContext,
    audiences
}: {
    project: Project;
    outputFilepath: AbsoluteFilePath;
    cliContext: CliContext;
    audiences: Audiences;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({ context });
                const ir = await generateIrForRapiddocsWorkspace({
                    workspace: rapiddocsWorkspace,
                    context,
                    generationLanguage: undefined,
                    audiences,
                    keywords: undefined,
                    smartCasing: false,
                    disableExamples: false,
                    readme: undefined,
                    includeDynamicExamples: false
                });

                const apiDefinition = convertIrToFdrApi({
                    ir,
                    snippetsConfig: {
                        typescriptSdk: undefined,
                        pythonSdk: undefined,
                        javaSdk: undefined,
                        rubySdk: undefined,
                        goSdk: undefined,
                        csharpSdk: undefined
                    }
                });

                const resolvedOutputFilePath = path.resolve(outputFilepath);
                await writeFile(resolvedOutputFilePath, await stringifyLargeObject(apiDefinition, { pretty: true }));
                context.logger.info(`Wrote FDR API definition to ${resolvedOutputFilePath}`);
            });
        })
    );
}
