import { RapiddocsToken } from "@khulnasoft/auth";
import {
    DEFAULT_GROUP_GENERATORS_CONFIG_KEY,
    GENERATORS_CONFIGURATION_FILENAME,
    rapiddocsConfigJson
} from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { runLocalGenerationForWorkspace } from "@khulnasoft/local-workspace-runner";
import { runRemoteGenerationForAPIWorkspace } from "@khulnasoft/remote-workspace-runner";
import { TaskContext } from "@khulnasoft/task-context";
import { AbstractAPIWorkspace } from "@khulnasoft/workspace-loader";

import { GROUP_CLI_OPTION } from "../../constants";
import { validateAPIWorkspaceAndLogIssues } from "../validate/validateAPIWorkspaceAndLogIssues";
import { GenerationMode } from "./generateAPIWorkspaces";

export async function generateWorkspace({
    organization,
    workspace,
    projectConfig,
    context,
    groupName,
    version,
    shouldLogS3Url,
    token,
    useLocalDocker,
    keepDocker,
    absolutePathToPreview,
    mode
}: {
    organization: string;
    workspace: AbstractAPIWorkspace<unknown>;
    projectConfig: rapiddocsConfigJson.ProjectConfig;
    context: TaskContext;
    version: string | undefined;
    groupName: string | undefined;
    shouldLogS3Url: boolean;
    token: RapiddocsToken | undefined;
    useLocalDocker: boolean;
    keepDocker: boolean;
    absolutePathToPreview: AbsoluteFilePath | undefined;
    mode: GenerationMode | undefined;
}): Promise<void> {
    if (workspace.generatorsConfiguration == null) {
        context.logger.warn("This workspaces has no generators.yml");
        return;
    }

    if (workspace.generatorsConfiguration.groups.length === 0) {
        context.logger.warn(`This workspaces has no groups specified in ${GENERATORS_CONFIGURATION_FILENAME}`);
        return;
    }

    const groupNameOrDefault = groupName ?? workspace.generatorsConfiguration.defaultGroup;
    if (groupNameOrDefault == null) {
        return context.failAndThrow(
            `No group specified. Use the --${GROUP_CLI_OPTION} option, or set "${DEFAULT_GROUP_GENERATORS_CONFIG_KEY}" in ${GENERATORS_CONFIGURATION_FILENAME}`
        );
    }

    const group = workspace.generatorsConfiguration.groups.find(
        (otherGroup) => otherGroup.groupName === groupNameOrDefault
    );
    if (group == null) {
        return context.failAndThrow(`Group '${groupNameOrDefault}' does not exist.`);
    }

    await validateAPIWorkspaceAndLogIssues({
        workspace: await workspace.toRapiddocsWorkspace({ context }),
        context,
        logWarnings: false
    });

    if (useLocalDocker) {
        await runLocalGenerationForWorkspace({
            projectConfig,
            workspace,
            generatorGroup: group,
            keepDocker,
            context
        });
    } else {
        if (!token) {
            return context.failAndThrow("Please run rapiddocs login");
        }
        await runRemoteGenerationForAPIWorkspace({
            projectConfig,
            organization,
            workspace,
            context,
            generatorGroup: group,
            version,
            shouldLogS3Url,
            token,
            whitelabel: workspace.generatorsConfiguration.whitelabel,
            absolutePathToPreview,
            mode
        });
    }
}
