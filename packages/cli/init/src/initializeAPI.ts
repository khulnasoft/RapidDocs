import chalk from "chalk";
import fs from "fs-extra";
import { mkdir } from "fs/promises";
import path from "path";

import {
    APIS_DIRECTORY,
    DEFAULT_API_WORKSPACE_FOLDER_NAME,
    DEFINITION_DIRECTORY,
    GENERATORS_CONFIGURATION_FILENAME
} from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { createRapiddocsDirectoryAndWorkspace } from "./createRapiddocsDirectoryAndOrganization";
import { createRapiddocsWorkspace, createOpenAPIWorkspace } from "./createWorkspace";

export async function initializeAPI({
    organization,
    versionOfCli,
    openApiPath,
    context
}: {
    organization: string | undefined;
    versionOfCli: string;
    openApiPath: AbsoluteFilePath | undefined;
    context: TaskContext;
}): Promise<void> {
    const { absolutePathToRapiddocsDirectory } = await createRapiddocsDirectoryAndWorkspace({
        organization,
        versionOfCli,
        taskContext: context
    });

    const directoryOfWorkspace = await getDirectoryOfNewAPIWorkspace({
        absolutePathToRapiddocsDirectory,
        taskContext: context
    });
    if (openApiPath != null) {
        await createOpenAPIWorkspace({
            directoryOfWorkspace,
            openAPIFilePath: openApiPath,
            cliVersion: versionOfCli,
            context
        });

        context.logger.info(chalk.green("Created new API: ./" + path.relative(process.cwd(), directoryOfWorkspace)));
    } else {
        await createRapiddocsWorkspace({ directoryOfWorkspace, cliVersion: versionOfCli, context });

        context.logger.info(chalk.green("Created new rapiddocs folder"));
    }
}

async function getDirectoryOfNewAPIWorkspace({
    absolutePathToRapiddocsDirectory,
    taskContext
}: {
    absolutePathToRapiddocsDirectory: AbsoluteFilePath;
    taskContext: TaskContext;
}) {
    const workspaces = await hasWorkspaces({ absolutePathToRapiddocsDirectory });
    if (workspaces) {
        let attemptCount = 0;
        const pathToApisDirectory: AbsoluteFilePath = join(
            absolutePathToRapiddocsDirectory,
            RelativeFilePath.of(APIS_DIRECTORY)
        );
        let newApiDirectory = join(pathToApisDirectory, RelativeFilePath.of(`${DEFAULT_API_WORKSPACE_FOLDER_NAME}`));
        while (await doesPathExist(newApiDirectory)) {
            newApiDirectory = join(
                pathToApisDirectory,
                RelativeFilePath.of(`${DEFAULT_API_WORKSPACE_FOLDER_NAME}${++attemptCount}`)
            );
        }
        return newApiDirectory;
    }

    const inlinedApiDefinition = await hasInlinedAPIDefinitions({ absolutePathToRapiddocsDirectory });
    if (inlinedApiDefinition) {
        taskContext.logger.info("Creating workspaces to support multiple API Definitions.");

        const apiWorkspaceDirectory = join(
            absolutePathToRapiddocsDirectory,
            RelativeFilePath.of(APIS_DIRECTORY),
            RelativeFilePath.of("api")
        );

        const inlinedDefinitionDirectory: AbsoluteFilePath = join(
            absolutePathToRapiddocsDirectory,
            RelativeFilePath.of(DEFINITION_DIRECTORY)
        );
        const workspaceDefinitionDirectory: AbsoluteFilePath = join(
            apiWorkspaceDirectory,
            RelativeFilePath.of(DEFINITION_DIRECTORY)
        );
        await mkdir(apiWorkspaceDirectory, { recursive: true });
        await fs.move(inlinedDefinitionDirectory, workspaceDefinitionDirectory);

        const inlinedGeneratorsYml: AbsoluteFilePath = join(
            absolutePathToRapiddocsDirectory,
            RelativeFilePath.of(GENERATORS_CONFIGURATION_FILENAME)
        );
        const workspaceGeneratorsYml: AbsoluteFilePath = join(
            apiWorkspaceDirectory,
            RelativeFilePath.of(GENERATORS_CONFIGURATION_FILENAME)
        );
        await fs.move(inlinedGeneratorsYml, workspaceGeneratorsYml);

        const newApiDirectory = join(
            absolutePathToRapiddocsDirectory,
            RelativeFilePath.of(APIS_DIRECTORY),
            RelativeFilePath.of("api1")
        );
        await mkdir(workspaceDefinitionDirectory, { recursive: true });
        return newApiDirectory;
    }

    // if no apis exist already, create an inlined definition
    return absolutePathToRapiddocsDirectory;
}

async function hasWorkspaces({
    absolutePathToRapiddocsDirectory
}: {
    absolutePathToRapiddocsDirectory: AbsoluteFilePath;
}): Promise<boolean> {
    const pathToApisDirectory: AbsoluteFilePath = join(
        absolutePathToRapiddocsDirectory,
        RelativeFilePath.of(APIS_DIRECTORY)
    );
    return await doesPathExist(pathToApisDirectory);
}

async function hasInlinedAPIDefinitions({
    absolutePathToRapiddocsDirectory
}: {
    absolutePathToRapiddocsDirectory: AbsoluteFilePath;
}): Promise<boolean> {
    const pathToSingleWorkspaceDefinition: AbsoluteFilePath = join(
        absolutePathToRapiddocsDirectory,
        RelativeFilePath.of(DEFINITION_DIRECTORY)
    );
    return await doesPathExist(pathToSingleWorkspaceDefinition);
}
