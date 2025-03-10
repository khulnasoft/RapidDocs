import { writeFile } from "fs/promises";
import path from "path";

import { generateFdrFromOpenApiWorkspace } from "@khulnasoft/docs-resolver";
import { AbsoluteFilePath, stringifyLargeObject } from "@khulnasoft/fs-utils";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";

export async function generateOpenApiToFdrApiDefinitionForWorkspaces({
    project,
    outputFilepath,
    cliContext
}: {
    project: Project;
    outputFilepath: AbsoluteFilePath;
    cliContext: CliContext;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                const fdrApiDefinition = await generateFdrFromOpenApiWorkspace(workspace, context);

                const resolvedOutputFilePath = path.resolve(outputFilepath);
                await writeFile(resolvedOutputFilePath, await stringifyLargeObject(fdrApiDefinition, { pretty: true }));
                context.logger.info(`Wrote FDR API definition to ${resolvedOutputFilePath}`);
            });
        })
    );
}
