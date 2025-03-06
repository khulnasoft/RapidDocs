import chalk from "chalk";
import { mkdir, rmdir, writeFile } from "fs/promises";
import yaml from "js-yaml";
import path from "path";

import { DEFINITION_DIRECTORY, ROOT_API_FILENAME, generatorsYml } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, RelativeFilePath, dirname, doesPathExist, join } from "@khulnasoft/fs-utils";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Project } from "@khulnasoft/project-loader";
import { TaskContext } from "@khulnasoft/task-context";
import { RapiddocsDefinition, RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { CliContext } from "../../cli-context/CliContext";

export async function writeDefinitionForWorkspaces({
    project,
    cliContext,
    sdkLanguage,
    preserveSchemaIds
}: {
    project: Project;
    cliContext: CliContext;
    sdkLanguage: generatorsYml.GenerationLanguage | undefined;
    preserveSchemaIds: boolean;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                if (workspace instanceof RapiddocsWorkspace) {
                    await writeDefinitionForRapiddocsWorkspace({ workspace, context });
                } else {
                    await writeDefinitionForNonRapiddocsWorkspace({
                        workspace: await workspace.toRapiddocsWorkspace({ context }, { preserveSchemaIds }),
                        context
                    });
                }
            });
        })
    );
}

async function writeDefinitionForRapiddocsWorkspace({
    workspace,
    context
}: {
    workspace: RapiddocsWorkspace;
    context: TaskContext;
}): Promise<void> {
    for (const [relativePath, importedDefinition] of Object.entries(workspace.definition.importedDefinitions)) {
        const absolutePathToOutputDirectory = join(
            workspace.absoluteFilePath,
            RelativeFilePath.of(DEFINITION_DIRECTORY),
            RelativeFilePath.of(relativePath),
            RelativeFilePath.of(`.${DEFINITION_DIRECTORY}`)
        );
        await writeRapiddocsDefinition({
            definition: importedDefinition.definition,
            absolutePathToOutputDirectory
        });
        context.logger.info(
            chalk.green(`Wrote imported definition at ${path.relative(process.cwd(), absolutePathToOutputDirectory)}`)
        );
    }
}

async function writeDefinitionForNonRapiddocsWorkspace({
    workspace,
    context
}: {
    workspace: RapiddocsWorkspace;
    context: TaskContext;
}): Promise<void> {
    const absolutePathToOutputDirectory = join(
        workspace.absoluteFilePath,
        RelativeFilePath.of(`.${DEFINITION_DIRECTORY}`)
    );
    await writeRapiddocsDefinition({
        definition: workspace.definition,
        absolutePathToOutputDirectory
    });
    context.logger.info(
        chalk.green(`Wrote definition to ${path.relative(process.cwd(), absolutePathToOutputDirectory)}`)
    );
}

async function writeRapiddocsDefinition({
    definition,
    absolutePathToOutputDirectory
}: {
    definition: RapiddocsDefinition;
    absolutePathToOutputDirectory: AbsoluteFilePath;
}): Promise<void> {
    const sortKeys = (a: string, b: string): number => {
        const customOrder: Record<string, number> = {
            imports: 0,
            types: 1,
            services: 2
        };

        const orderA = a in customOrder ? customOrder[a] : Object.keys(customOrder).length;
        const orderB = b in customOrder ? customOrder[b] : Object.keys(customOrder).length;

        if (orderA == null) {
            return -1;
        } else if (orderB == null) {
            return 1;
        } else if (orderA !== orderB) {
            return orderA - orderB;
        }

        // If both keys have the same custom order (or are both not in the custom order),
        // sort alphabetically
        return a.localeCompare(b);
    };

    if (await doesPathExist(absolutePathToOutputDirectory)) {
        await rmdir(absolutePathToOutputDirectory, { recursive: true });
    }

    // write api.yml
    await mkdir(absolutePathToOutputDirectory, { recursive: true });
    await writeFile(
        join(absolutePathToOutputDirectory, RelativeFilePath.of(ROOT_API_FILENAME)),
        yaml.dump(definition.rootApiFile.contents, { sortKeys })
    );

    // write __package__.yml
    for (const [relativePath, packageMarker] of Object.entries(definition.packageMarkers)) {
        const absoluteFilepath = join(absolutePathToOutputDirectory, RelativeFilePath.of(relativePath));
        await mkdir(dirname(absoluteFilepath), { recursive: true });
        await writeFile(absoluteFilepath, yaml.dump(packageMarker.contents, { sortKeys }));
    }

    // write named definition files
    for (const [relativePath, definitionFile] of Object.entries(definition.namedDefinitionFiles)) {
        const absoluteFilepath = join(absolutePathToOutputDirectory, RelativeFilePath.of(relativePath));
        await mkdir(dirname(absoluteFilepath), { recursive: true });
        await writeFile(absoluteFilepath, yaml.dump(definitionFile.contents, { sortKeys }));
    }
}
