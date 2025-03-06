import path from "path";

import { Audiences, generatorsYml } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, streamObjectToFile, stringifyLargeObject } from "@khulnasoft/fs-utils";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";
import { generateIrForRapiddocsWorkspace } from "../generate-ir/generateIrForRapiddocsWorkspace";

export async function generateDynamicIrForWorkspaces({
    project,
    irFilepath,
    cliContext,
    generationLanguage,
    audiences,
    version,
    keywords,
    smartCasing,
    includeDynamicExamples
}: {
    project: Project;
    irFilepath: AbsoluteFilePath;
    cliContext: CliContext;
    generationLanguage: generatorsYml.GenerationLanguage | undefined;
    audiences: Audiences;
    version: string | undefined;
    keywords: string[] | undefined;
    smartCasing: boolean;
    includeDynamicExamples: boolean;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                cliContext.logger.info(`Generating IR for workspace ${workspace.workspaceName ?? "api"}`);
                const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({ context });

                const intermediateRepresentation = await generateIrForRapiddocsWorkspace({
                    workspace: rapiddocsWorkspace,
                    context,
                    generationLanguage,
                    keywords,
                    smartCasing,
                    disableExamples: false,
                    audiences,
                    readme: undefined,
                    includeDynamicExamples
                });

                if (intermediateRepresentation.dynamic == null) {
                    throw new Error("Internal error; dynamic IR was not generated");
                }

                const irOutputFilePath = path.resolve(irFilepath);
                await streamObjectToFile(AbsoluteFilePath.of(irOutputFilePath), intermediateRepresentation.dynamic);
                context.logger.info(`Wrote IR to ${irOutputFilePath}`);
            });
        })
    );
}
