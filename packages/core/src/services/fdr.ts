import { RapiddocsRegistryClient as FdrClient } from "@rapiddocs-rapiddocs/fdr-cjs-sdk";
import { RapiddocsRegistryClient } from "@rapiddocs-rapiddocs/fdr-test-sdk";

export function createFdrService({
    environment = process.env.DEFAULT_FDR_ORIGIN ?? "https://registry.buildwithrapiddocs.com",
    token
}: {
    environment?: string;
    token: (() => string) | string;
}): FdrClient {
    return new FdrClient({
        environment,
        token
    });
}

export function createFdrTestService({
    environment = process.env.DEFAULT_FDR_ORIGIN ?? "https://registry.buildwithrapiddocs.com",
    token
}: {
    environment?: string;
    token: (() => string) | string;
}): RapiddocsRegistryClient {
    return new RapiddocsRegistryClient({
        environment,
        token
    });
}
