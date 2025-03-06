import semver from "semver";

import { TaskContext } from "@khulnasoft/task-context";

import { RapiddocsRegistry, RapiddocsRegistryClient as GeneratorsClient } from "@rapiddocs-rapiddocs/generators-sdk";

export async function getLatestGeneratorVersion({
    generatorName,
    cliVersion,
    channel,
    currentGeneratorVersion,
    includeMajor,
    context
}: {
    generatorName: string;
    cliVersion: string;
    channel: RapiddocsRegistry.generators.ReleaseType | undefined;
    currentGeneratorVersion?: string;
    includeMajor?: boolean;
    context?: TaskContext;
}): Promise<string | undefined> {
    const parsedVersion = semver.parse(currentGeneratorVersion);
    // We're just using unauthed endpoints, so we don't need to pass in a token
    const client = new GeneratorsClient({
        environment: process.env.DEFAULT_FDR_ORIGIN ?? "https://registry.buildwithrapiddocs.com"
    });
    context?.logger.debug(
        `Getting latest version for ${generatorName} with CLI version ${cliVersion}, includeMajor: ${includeMajor}, prior version: ${parsedVersion}`
    );

    const payload: RapiddocsRegistry.generators.versions.GetLatestGeneratorReleaseRequest = {
        generator: getGeneratorMetadataFromName(generatorName, context),
        releaseTypes: [channel ?? RapiddocsRegistry.generators.ReleaseType.Ga],
        // We get "*" as 0.0.0, so we need to handle that case for tests
        // if we see this, then we shouldn't restrict on the CLI version
        cliVersion: cliVersion === "0.0.0" ? undefined : cliVersion
    };

    if (!includeMajor && parsedVersion != null) {
        payload.generatorMajorVersion = parsedVersion.major;
    }

    const latestReleaseResponse = await client.generators.versions.getLatestGeneratorRelease(payload);

    if (latestReleaseResponse.ok) {
        return latestReleaseResponse.body.version;
    }
    return undefined;
}

// HACK: Since none of the image names are really standardized, we need to manually map them to the language and generator type
// This should be removed in CLI v2, where language and type are codified within the config directly, without a docker image name
//
// Ideally we just do a lookup that's sdk type and language, but we need to do this for now, but we're looking to keep our options
// open when it comes to handling generators by some ID (and don't necessarily want to disallow multiple generators of the same type in the same language)
function getGeneratorMetadataFromName(generatorName: string, context?: TaskContext): string {
    if (generatorName.startsWith("rapiddocsapi/")) {
        generatorName = generatorName.replace("rapiddocsapi/", "");
    }
    switch (generatorName) {
        // Python
        case "rapiddocs-python-sdk":
            return "python-sdk";
        case "rapiddocs-pydantic-model":
            return "pydantic";
        case "rapiddocs-fastapi-server":
            return "fastapi";
        // TypeScript
        case "rapiddocs-typescript-browser-sdk":
        case "rapiddocs-typescript-node-sdk":
        case "rapiddocs-typescript-sdk":
            return "ts-sdk";
        case "rapiddocs-typescript-express":
            return "ts-express";
        // Java
        case "rapiddocs-java-sdk":
            return "java-sdk";
        case "java-model":
            return "java-model";
        case "rapiddocs-java-spring":
            return "java-spring";
        // Go
        case "rapiddocs-go-sdk":
            return "go-sdk";
        case "rapiddocs-go-model":
            return "go-model";
        case "rapiddocs-go-fiber":
            return "go-fiber";
        // C#
        case "rapiddocs-csharp-sdk":
            return "csharp-sdk";
        case "rapiddocs-csharp-model":
            return "csharp-model";
        // Ruby
        case "rapiddocs-ruby-sdk":
            return "ruby-sdk";
        case "rapiddocs-ruby-model":
            return "ruby-model";
        // Misc.
        case "rapiddocs-postman":
            return "postman";
        case "rapiddocs-openapi":
            return "openapi";

        default: {
            context?.logger.warn(`Unrecognized generator name found, attempting to parse manually: ${generatorName}`);
            if (generatorName.startsWith("rapiddocs-")) {
                return generatorName.replace("rapiddocs-", "");
            }
            return generatorName;
        }
    }
}
