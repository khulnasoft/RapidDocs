import { createVenusService } from "@khulnasoft/core";

import { RapiddocsOrganizationToken } from "../RapiddocsToken";

export async function verifyAccessToken(token: RapiddocsOrganizationToken): Promise<boolean> {
    const venus = createVenusService({ token: token.value });
    const response = await venus.organization.getMyOrganizationFromScopedToken();
    return response.ok;
}
