import { RapiddocsFiddleClient } from "@rapiddocs-rapiddocs/fiddle-sdk";

const FIDDLE_ORIGIN =
    process.env.RAPIDDOCS_FIDDLE_ORIGIN ??
    process.env.DEFAULT_FIDDLE_ORIGIN ??
    "https://fiddle-coordinator.buildwithrapiddocs.com";

export function getFiddleOrigin(): string {
    return FIDDLE_ORIGIN;
}

export function createFiddleService({ token }: { token?: string } = {}): RapiddocsFiddleClient {
    return new RapiddocsFiddleClient({
        environment: FIDDLE_ORIGIN,
        token
    });
}
