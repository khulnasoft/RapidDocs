import chalk from "chalk";
import { writeFile } from "fs/promises";
import yaml from "js-yaml";

import {
    addGenerator,
    getPathToGeneratorsConfiguration,
    loadRawGeneratorsConfiguration
} from "@khulnasoft/configuration-loader";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";

export async function addGeneratorToWorkspaces({
    project: { apiWorkspaces },
    generatorName,
    groupName,
    cliContext
}: {
    project: Project;
    generatorName: string;
    groupName: string | undefined;
    cliContext: CliContext;
}): Promise<void> {
    await Promise.all(
        apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                const generatorsConfiguration =
                    (await loadRawGeneratorsConfiguration({
                        absolutePathToWorkspace: workspace.absoluteFilePath,
                        context
                    })) ?? {};

                const newConfiguration = await addGenerator({
                    generatorName,
                    generatorsConfiguration,
                    groupName,
                    context,
                    cliVersion: cliContext.environment.packageVersion
                });

                const absolutePathToGeneratorsConfiguration =
                    workspace.generatorsConfiguration?.absolutePathToConfiguration ??
                    (await getPathToGeneratorsConfiguration({
                        absolutePathToWorkspace: workspace.absoluteFilePath
                    }));

                if (absolutePathToGeneratorsConfiguration == null) {
                    return;
                }

                await writeFile(
                    absolutePathToGeneratorsConfiguration,
                    "# yaml-language-server: $schema=https://schema.buildwithrapiddocs.dev/generators-yml.json\n" +
                        yaml.dump(newConfiguration)
                );
                context.logger.info(chalk.green(`Added ${generatorName} generator`));
            });
        })
    );
}
