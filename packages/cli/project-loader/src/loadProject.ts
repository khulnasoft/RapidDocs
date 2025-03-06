import chalk from "chalk";
import { readdir } from "fs/promises";

import { AbstractAPIWorkspace } from "@khulnasoft/api-workspace-commons";
import {
    APIS_DIRECTORY,
    ASYNCAPI_DIRECTORY,
    DEFINITION_DIRECTORY,
    RAPIDDOCS_DIRECTORY,
    GENERATORS_CONFIGURATION_FILENAME,
    OPENAPI_DIRECTORY,
    rapiddocsConfigJson,
    generatorsYml,
    getRapiddocsDirectory,
    loadProjectConfig
} from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";
import { handleFailedWorkspaceParserResult, loadAPIWorkspace, loadDocsWorkspace } from "@khulnasoft/workspace-loader";

import { Project } from "./Project";

export declare namespace loadProject {
    export interface Args {
        cliName: string;
        cliVersion: string;
        commandLineApiWorkspace: string | undefined;
        /**
         * if false and commandLineWorkspace it not defined,
         * loadProject will cause the CLI to fail
         */
        defaultToAllApiWorkspaces: boolean;
        context: TaskContext;
        nameOverride?: string;
        sdkLanguage?: generatorsYml.GenerationLanguage;
        preserveSchemaIds?: boolean;
    }

    export interface LoadProjectFromDirectoryArgs extends Args {
        absolutePathToRapiddocsDirectory: AbsoluteFilePath;
    }
}

export async function loadProject({ context, nameOverride, ...args }: loadProject.Args): Promise<Project> {
    const rapiddocsDirectory = await getRapiddocsDirectory(nameOverride);
    if (rapiddocsDirectory == null) {
        return context.failAndThrow(`Directory "${nameOverride ?? RAPIDDOCS_DIRECTORY}" not found.`);
    }

    return await loadProjectFromDirectory({
        absolutePathToRapiddocsDirectory: rapiddocsDirectory,
        context,
        nameOverride,
        ...args
    });
}

export async function loadProjectFromDirectory({
    absolutePathToRapiddocsDirectory,
    cliName,
    cliVersion,
    commandLineApiWorkspace,
    defaultToAllApiWorkspaces,
    context
}: loadProject.LoadProjectFromDirectoryArgs): Promise<Project> {
    let apiWorkspaces: AbstractAPIWorkspace<unknown>[] = [];

    if (
        (await doesPathExist(join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(APIS_DIRECTORY)))) ||
        (await doesPathExist(join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(DEFINITION_DIRECTORY)))) ||
        (await doesPathExist(
            join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(GENERATORS_CONFIGURATION_FILENAME))
        )) ||
        (await doesPathExist(join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(OPENAPI_DIRECTORY)))) ||
        (await doesPathExist(join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(ASYNCAPI_DIRECTORY))))
    ) {
        apiWorkspaces = await loadApis({
            cliName,
            rapiddocsDirectory: absolutePathToRapiddocsDirectory,
            cliVersion,
            context,
            commandLineApiWorkspace,
            defaultToAllApiWorkspaces
        });
    }

    return {
        config: await loadProjectConfig({ directory: absolutePathToRapiddocsDirectory, context }),
        apiWorkspaces,
        docsWorkspaces: await loadDocsWorkspace({ rapiddocsDirectory: absolutePathToRapiddocsDirectory, context }),
        loadAPIWorkspace: (name: string | undefined): AbstractAPIWorkspace<unknown> | undefined => {
            if (name == null) {
                return apiWorkspaces[0];
            }
            return apiWorkspaces.find((workspace) => workspace.workspaceName === name);
        }
    };
}

export async function loadApis({
    cliName,
    rapiddocsDirectory,
    context,
    cliVersion,
    commandLineApiWorkspace,
    defaultToAllApiWorkspaces
}: {
    cliName: string;
    rapiddocsDirectory: AbsoluteFilePath;
    context: TaskContext;
    cliVersion: string;
    commandLineApiWorkspace: string | undefined;
    defaultToAllApiWorkspaces: boolean;
}): Promise<AbstractAPIWorkspace<unknown>[]> {
    const apisDirectory = join(rapiddocsDirectory, RelativeFilePath.of(APIS_DIRECTORY));
    const apisDirectoryExists = await doesPathExist(apisDirectory);
    if (apisDirectoryExists) {
        const apiDirectoryContents = await readdir(apisDirectory, { withFileTypes: true });

        const apiWorkspaceDirectoryNames = apiDirectoryContents.reduce<string[]>((all, item) => {
            if (item.isDirectory()) {
                all.push(item.name);
            }
            return all;
        }, []);

        if (commandLineApiWorkspace != null) {
            if (!apiWorkspaceDirectoryNames.includes(commandLineApiWorkspace)) {
                return context.failAndThrow("API does not exist: " + commandLineApiWorkspace);
            }
        } else if (apiWorkspaceDirectoryNames.length === 0) {
            return context.failAndThrow("No APIs found.");
        } else if (apiWorkspaceDirectoryNames.length > 1 && !defaultToAllApiWorkspaces) {
            let message = "There are multiple workspaces. You must specify one with --api:\n";
            const longestWorkspaceName = Math.max(
                ...apiWorkspaceDirectoryNames.map((workspaceName) => workspaceName.length)
            );
            message += apiWorkspaceDirectoryNames
                .map((workspaceName) => {
                    const suggestedCommand = `${cliName} ${process.argv.slice(2).join(" ")} --api ${workspaceName}`;
                    return ` › ${chalk.bold(workspaceName.padEnd(longestWorkspaceName))}  ${chalk.dim(
                        suggestedCommand
                    )}`;
                })
                .join("\n");
            return context.failAndThrow(message);
        }

        const apiWorkspaces: AbstractAPIWorkspace<unknown>[] = [];

        const filteredWorkspaces =
            commandLineApiWorkspace != null
                ? apiWorkspaceDirectoryNames.filter((api) => {
                      return api === commandLineApiWorkspace;
                  })
                : apiWorkspaceDirectoryNames;

        await Promise.all(
            filteredWorkspaces.map(async (workspaceDirectoryName) => {
                const workspace = await loadAPIWorkspace({
                    absolutePathToWorkspace: join(apisDirectory, RelativeFilePath.of(workspaceDirectoryName)),
                    context,
                    cliVersion,
                    workspaceName: workspaceDirectoryName
                });
                if (workspace.didSucceed) {
                    apiWorkspaces.push(workspace.workspace);
                } else {
                    handleFailedWorkspaceParserResult(workspace, context.logger);
                    context.failAndThrow();
                }
            })
        );

        return apiWorkspaces;
    }

    const workspace = await loadAPIWorkspace({
        absolutePathToWorkspace: rapiddocsDirectory,
        context,
        cliVersion,
        workspaceName: undefined
    });
    if (workspace.didSucceed) {
        return [workspace.workspace];
    } else {
        handleFailedWorkspaceParserResult(workspace, context.logger);
        return [];
    }
}
