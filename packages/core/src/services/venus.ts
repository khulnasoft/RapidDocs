import { RapiddocsVenusApiClient } from "@khulnasoft/venus-api-sdk";

export function createVenusService({
    environment = process.env.DEFAULT_VENUS_ORIGIN ?? "https://venus.buildwithrapiddocs.com",
    token
}: { environment?: string; token?: string } = {}): RapiddocsVenusApiClient {
    return new RapiddocsVenusApiClient({
        environment,
        token
    });
}
