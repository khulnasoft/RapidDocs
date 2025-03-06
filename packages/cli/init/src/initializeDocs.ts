import chalk from "chalk";
import fs from "fs-extra";
import { writeFile } from "fs/promises";
import yaml from "js-yaml";

import { DOCS_CONFIGURATION_FILENAME } from "@khulnasoft/configuration-loader";
import { docsYml } from "@khulnasoft/configuration-loader";
import { RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { titleCase } from "../../../commons/core-utils/src";
import { createRapiddocsDirectoryAndWorkspace } from "./createRapiddocsDirectoryAndOrganization";

export async function initializeDocs({
    organization,
    taskContext,
    versionOfCli
}: {
    organization: string | undefined;
    taskContext: TaskContext;
    versionOfCli: string;
}): Promise<void> {
    const createDirectoryResponse = await createRapiddocsDirectoryAndWorkspace({
        organization,
        versionOfCli,
        taskContext
    });

    if (createDirectoryResponse.absolutePathToRapiddocsDirectory) {
        const docsYmlPath = join(
            createDirectoryResponse.absolutePathToRapiddocsDirectory,
            RelativeFilePath.of(DOCS_CONFIGURATION_FILENAME)
        );

        if (await doesPathExist(docsYmlPath)) {
            taskContext.logger.info(chalk.yellow(`Docs configuration already exists at: ${docsYmlPath}`));
            return;
        } else {
            try {
                await writeFile(docsYmlPath, yaml.dump(getDocsConfig(createDirectoryResponse.organization)));
                taskContext.logger.info(chalk.green("Created docs configuration"));
                return;
            } catch (writeError) {
                const errorMessage = writeError instanceof Error ? writeError.message : String(writeError);
                taskContext.logger.debug(`Encountered an error while writing docs configuration: ${errorMessage}`);
                taskContext.logger.error(chalk.red("Failed to write docs configuration"));
                throw writeError;
            }
        }
    }
}

function getDocsConfig(organization: string): docsYml.RawSchemas.DocsConfiguration {
    return {
        instances: [
            {
                url: `https://${organization}.${process.env.DOCS_DOMAIN_SUFFIX}`
            }
        ],
        title: `${titleCase(organization)} | Documentation`,
        navigation: [{ api: "API Reference", paginated: true }],
        colors: {
            accentPrimary: "#ffffff",
            background: "#000000"
        }
    };
}
