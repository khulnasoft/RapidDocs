import { createVenusService } from "@khulnasoft/core";
import { TaskContext } from "@khulnasoft/task-context";
import { RapiddocsVenusApi } from "@khulnasoft/venus-api-sdk";

import { RapiddocsUserToken } from "../RapiddocsToken";
import { getOrganizationNameValidationError } from "./getOrganizationNameValidationError";

export async function createOrganizationIfDoesNotExist({
    organization,
    token,
    context
}: {
    organization: string;
    token: RapiddocsUserToken;
    context: TaskContext;
}): Promise<boolean> {
    const venus = createVenusService({ token: token.value });
    const getOrganizationResponse = await venus.organization.get(RapiddocsVenusApi.OrganizationId(organization));

    if (getOrganizationResponse.ok) {
        return false;
    }
    // if failed response, assume organization does not exist

    const validationError = getOrganizationNameValidationError(organization);
    if (validationError != null) {
        context.failAndThrow(validationError);
    }
    const createOrganizationResponse = await venus.organization.create({
        organizationId: RapiddocsVenusApi.OrganizationId(organization)
    });
    if (!createOrganizationResponse.ok) {
        context.failAndThrow(`Failed to create organization: ${organization}`, createOrganizationResponse.error);
    }
    return true;
}
