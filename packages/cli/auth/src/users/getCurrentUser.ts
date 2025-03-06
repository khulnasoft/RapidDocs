import { createVenusService } from "@khulnasoft/core";
import { TaskContext } from "@khulnasoft/task-context";
import { RapiddocsVenusApi } from "@khulnasoft/venus-api-sdk";

import { RapiddocsUserToken } from "../RapiddocsToken";

export async function getCurrentUser({
    token,
    context
}: {
    token: RapiddocsUserToken;
    context: TaskContext;
}): Promise<RapiddocsVenusApi.User> {
    const response = await createVenusService({ token: token.value }).user.getMyself();
    if (!response.ok) {
        return context.failAndThrow("Failed to fetch user info");
    }
    return response.body;
}
