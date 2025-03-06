import chalk from "chalk";

import { createOrganizationIfDoesNotExist } from "@khulnasoft/auth";
import { createVenusService } from "@khulnasoft/core";
import { askToLogin } from "@khulnasoft/login";
import { TaskContext } from "@khulnasoft/task-context";
import { RapiddocsVenusApi } from "@khulnasoft/venus-api-sdk";

export async function generateToken({
    orgId,
    taskContext
}: {
    orgId: string;
    taskContext: TaskContext;
}): Promise<void> {
    const token = await askToLogin(taskContext);
    if (token.type === "user") {
        await createOrganizationIfDoesNotExist({ organization: orgId, token, context: taskContext });
    }
    const venus = createVenusService({ token: token.value });
    const response = await venus.registry.generateRegistryTokens({
        organizationId: RapiddocsVenusApi.OrganizationId(orgId)
    });
    if (response.ok) {
        taskContext.logger.info(chalk.green(`Generated a RAPIDDOCS_TOKEN for ${orgId}: ${response.body.npm.token}`));
        return;
    }
    response.error._visit({
        organizationNotFoundError: () =>
            taskContext.failAndThrow(
                `Failed to create token because the organization ${orgId} was not found. Please reach out to support@buildwithrapiddocs.com`
            ),
        unauthorizedError: () =>
            taskContext.failAndThrow(
                `Failed to create token because you are not in the ${orgId} organization. Please reach out to support@buildwithrapiddocs.com`
            ),
        _other: () => taskContext.failAndThrow("Failed to create token. Please reach out to support@buildwithrapiddocs.com")
    });
}
