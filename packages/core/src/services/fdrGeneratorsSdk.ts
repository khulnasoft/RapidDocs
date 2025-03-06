import { RapiddocsRegistryClient as FdrClient } from "@rapiddocs-rapiddocs/generators-sdk";

export function createFdrGeneratorsSdkService({
    environment = process.env.DEFAULT_FDR_ORIGIN ?? "https://registry.buildwithrapiddocs.com",
    token
}: {
    environment?: string;
    token: (() => string) | string | undefined;
}): FdrClient {
    return new FdrClient({
        environment,
        token
    });
}
