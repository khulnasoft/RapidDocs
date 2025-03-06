import path from "path";

import { AbstractAPIWorkspace } from "@khulnasoft/api-workspace-commons";
import { Audiences, generatorsYml } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, streamObjectToFile } from "@khulnasoft/fs-utils";
import { migrateIntermediateRepresentationThroughVersion } from "@khulnasoft/ir-migrations";
import { serialization as IrSerialization } from "@khulnasoft/ir-sdk";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Project } from "@khulnasoft/project-loader";
import { TaskContext } from "@khulnasoft/task-context";

import { CliContext } from "../../cli-context/CliContext";
import { generateIrForRapiddocsWorkspace } from "./generateIrForRapiddocsWorkspace";

export async function generateIrForWorkspaces({
    project,
    irFilepath,
    cliContext,
    generationLanguage,
    audiences,
    version,
    keywords,
    smartCasing,
    readme,
    directFromOpenapi
}: {
    project: Project;
    irFilepath: AbsoluteFilePath;
    cliContext: CliContext;
    generationLanguage: generatorsYml.GenerationLanguage | undefined;
    audiences: Audiences;
    version: string | undefined;
    keywords: string[] | undefined;
    smartCasing: boolean;
    readme: generatorsYml.ReadmeSchema | undefined;
    directFromOpenapi: boolean;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                cliContext.logger.info(`Generating IR for workspace ${workspace.workspaceName ?? "api"}`);

                const intermediateRepresentation = await getIntermediateRepresentation({
                    workspace,
                    context,
                    generationLanguage,
                    keywords,
                    smartCasing,
                    disableExamples: false,
                    audiences,
                    version,
                    readme,
                    directFromOpenapi
                });

                const irOutputFilePath = path.resolve(irFilepath);
                await streamObjectToFile(AbsoluteFilePath.of(irOutputFilePath), intermediateRepresentation);
                context.logger.info(`Wrote IR to ${irOutputFilePath}`);
            });
        })
    );
}

async function getIntermediateRepresentation({
    workspace,
    context,
    generationLanguage,
    audiences,
    keywords,
    smartCasing,
    disableExamples,
    version,
    readme,
    directFromOpenapi
}: {
    workspace: AbstractAPIWorkspace<unknown>;
    context: TaskContext;
    generationLanguage: generatorsYml.GenerationLanguage | undefined;
    keywords: string[] | undefined;
    smartCasing: boolean;
    disableExamples: boolean;
    audiences: Audiences;
    version: string | undefined;
    readme: generatorsYml.ReadmeSchema | undefined;
    directFromOpenapi: boolean;
}): Promise<unknown> {
    let intermediateRepresentation;
    if (directFromOpenapi && workspace instanceof OSSWorkspace) {
        intermediateRepresentation = await workspace.getIntermediateRepresentation({ context });
    } else {
        const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({ context });

        intermediateRepresentation = await generateIrForRapiddocsWorkspace({
            workspace: rapiddocsWorkspace,
            context,
            generationLanguage,
            audiences,
            keywords,
            smartCasing,
            disableExamples,
            readme,
            includeDynamicExamples: false
        });
    }

    if (version == null) {
        return IrSerialization.IntermediateRepresentation.jsonOrThrow(intermediateRepresentation, {
            unrecognizedObjectKeys: "strip"
        });
    }

    return migrateIntermediateRepresentationThroughVersion({
        intermediateRepresentation,
        version,
        context
    });
}
