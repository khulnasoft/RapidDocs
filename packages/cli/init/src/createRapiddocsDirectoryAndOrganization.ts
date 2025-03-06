import chalk from "chalk";
import { mkdir, writeFile } from "fs/promises";
import { kebabCase } from "lodash-es";

import { createOrganizationIfDoesNotExist, getCurrentUser } from "@khulnasoft/auth";
import {
    RAPIDDOCS_DIRECTORY,
    PROJECT_CONFIG_FILENAME,
    rapiddocsConfigJson,
    loadProjectConfig
} from "@khulnasoft/configuration-loader";
import { createVenusService } from "@khulnasoft/core";
import { AbsoluteFilePath, RelativeFilePath, cwd, doesPathExist, join } from "@khulnasoft/fs-utils";
import { askToLogin } from "@khulnasoft/login";
import { TaskContext } from "@khulnasoft/task-context";

export async function createRapiddocsDirectoryAndWorkspace({
    organization,
    taskContext,
    versionOfCli
}: {
    organization: string | undefined;
    taskContext: TaskContext;
    versionOfCli: string;
}): Promise<{ absolutePathToRapiddocsDirectory: AbsoluteFilePath; organization: string }> {
    const pathToRapiddocsDirectory = join(cwd(), RelativeFilePath.of(RAPIDDOCS_DIRECTORY));

    if (!(await doesPathExist(pathToRapiddocsDirectory))) {
        if (organization == null) {
            const token = await askToLogin(taskContext);
            if (token.type === "user") {
                const user = await getCurrentUser({ token, context: taskContext });
                organization = kebabCase(user.username);
                const didCreateOrganization = await createOrganizationIfDoesNotExist({
                    organization,
                    token,
                    context: taskContext
                });
                if (didCreateOrganization) {
                    taskContext.logger.info(`${chalk.green(`Created organization ${chalk.bold(organization)}`)}`);
                }
            } else {
                const venus = createVenusService({ token: token.value });
                const response = await venus.organization.getMyOrganizationFromScopedToken();
                if (response.ok) {
                    organization = response.body.organizationId;
                } else {
                    taskContext.failAndThrow("Unauthorized. RAPIDDOCS_TOKEN is invalid.");
                    // dummy return value to appease the linter. won't actually ever get run.
                    return { absolutePathToRapiddocsDirectory: AbsoluteFilePath.of("/dummy"), organization: "dummy" };
                }
            }
        }

        await mkdir(RAPIDDOCS_DIRECTORY);
        await writeProjectConfig({
            filepath: join(pathToRapiddocsDirectory, RelativeFilePath.of(PROJECT_CONFIG_FILENAME)),
            organization,
            versionOfCli
        });
    } else {
        const projectConfig = await loadProjectConfig({
            directory: pathToRapiddocsDirectory,
            context: taskContext
        });
        organization = projectConfig.organization;
    }

    return {
        absolutePathToRapiddocsDirectory: pathToRapiddocsDirectory,
        organization
    };
}

async function writeProjectConfig({
    organization,
    filepath,
    versionOfCli
}: {
    organization: string;
    filepath: AbsoluteFilePath;
    versionOfCli: string;
}): Promise<void> {
    const projectConfig: rapiddocsConfigJson.ProjectConfigSchema = {
        organization,
        version: versionOfCli
    };
    await writeFile(filepath, JSON.stringify(projectConfig, undefined, 4));
}
