import { generatorsYml } from "@khulnasoft/configuration";
import { assertNever } from "@khulnasoft/core-utils";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";

import { RapiddocsFiddle } from "@rapiddocs-rapiddocs/fiddle-sdk";
import { GithubPublishInfo, PublishOutputModeV2 } from "@rapiddocs-rapiddocs/fiddle-sdk/api";
import * as RapiddocsFiddleSerialization from "@rapiddocs-rapiddocs/fiddle-sdk/serialization";

import { OutputMode } from "../config/api";
import { ParsedDockerName } from "../utils/parseDockerOrThrow";

export async function getGeneratorInvocation({
    absolutePathToOutput,
    docker,
    language,
    customConfig,
    publishConfig,
    outputMode,
    fixtureName,
    irVersion,
    publishMetadata,
    readme
}: {
    absolutePathToOutput: AbsoluteFilePath;
    docker: ParsedDockerName;
    language: generatorsYml.GenerationLanguage | undefined;
    customConfig: unknown;
    publishConfig: unknown;
    outputMode: OutputMode;
    fixtureName: string;
    irVersion: string;
    publishMetadata: unknown;
    readme: generatorsYml.ReadmeSchema | undefined;
}): Promise<generatorsYml.GeneratorInvocation> {
    return {
        name: docker.name,
        version: docker.version,
        config: customConfig,
        outputMode: await getOutputMode({ outputMode, language, fixtureName, publishConfig }),
        absolutePathToLocalOutput: absolutePathToOutput,
        absolutePathToLocalSnippets: undefined,
        language,
        keywords: undefined,
        smartCasing: false,
        disableExamples: false,
        irVersionOverride: irVersion,
        publishMetadata:
            publishMetadata != null
                ? await RapiddocsFiddleSerialization.PublishingMetadata.parseOrThrow(publishMetadata)
                : undefined,
        readme,
        settings: undefined
    };
}

async function getOutputMode({
    outputMode,
    language,
    fixtureName,
    publishConfig
}: {
    outputMode: OutputMode;
    language: generatorsYml.GenerationLanguage | undefined;
    fixtureName: string;
    publishConfig: unknown;
}): Promise<RapiddocsFiddle.OutputMode> {
    switch (outputMode) {
        case "github":
            const githubPublishInfo =
                publishConfig != null
                    ? await RapiddocsFiddleSerialization.GithubPublishInfo.parseOrThrow(publishConfig)
                    : undefined;
            return RapiddocsFiddle.OutputMode.github({
                repo: "rapiddocs",
                owner: fixtureName,
                publishInfo:
                    githubPublishInfo ??
                    (language != null ? getGithubPublishInfo({ language, fixtureName }) : undefined)
            });
        case "local_files":
            return RapiddocsFiddle.remoteGen.OutputMode.downloadFiles({});
        case "publish": {
            if (language == null) {
                throw new Error("Seed requires a language to be specified to test in publish mode");
            }
            const publishOutputModeConfig = publishConfig != null ? (publishConfig as PublishOutputModeV2) : undefined;
            return RapiddocsFiddle.remoteGen.OutputMode.publishV2(
                publishOutputModeConfig ?? getPublishInfo({ language, fixtureName })
            );
        }
        default:
            assertNever(outputMode);
    }
}

function getGithubPublishInfo({
    language,
    fixtureName
}: {
    language: generatorsYml.GenerationLanguage;
    fixtureName: string;
}): GithubPublishInfo | undefined {
    switch (language) {
        case "java":
            return RapiddocsFiddle.GithubPublishInfo.maven({
                coordinate: `com.rapiddocs:${fixtureName}`,
                registryUrl: ""
            });
        case "python":
            return RapiddocsFiddle.GithubPublishInfo.pypi({
                packageName: `rapiddocs_${fixtureName}`,
                registryUrl: "",
                pypiMetadata: {
                    keywords: ["rapiddocs", "test"],
                    documentationLink: "https://buildwithrapiddocs.com/learn",
                    homepageLink: "https://buildwithrapiddocs.com/"
                }
            });
        case "typescript":
            return RapiddocsFiddle.GithubPublishInfo.npm({
                packageName: `@rapiddocs/${fixtureName}`,
                registryUrl: ""
            });
        case "go":
            return undefined;
        case "ruby":
            return RapiddocsFiddle.GithubPublishInfo.rubygems({
                packageName: `rapiddocs_${fixtureName}`,
                registryUrl: ""
            });
        case "csharp":
            return RapiddocsFiddle.GithubPublishInfo.nuget({
                packageName: `Rapiddocs${fixtureName}`,
                registryUrl: ""
            });
        case "swift":
            return undefined;
        case "php":
            return undefined;
        default:
            assertNever(language);
    }
}

function getPublishInfo({
    language,
    fixtureName
}: {
    language: generatorsYml.GenerationLanguage;
    fixtureName: string;
}): PublishOutputModeV2 {
    switch (language) {
        case "java":
            return RapiddocsFiddle.remoteGen.PublishOutputModeV2.mavenOverride({
                username: "rapiddocs",
                password: "rapiddocs1!",
                registryUrl: "https://maven.com",
                coordinate: `com.rapiddocs:${fixtureName}`
            });
        case "python":
            return RapiddocsFiddle.remoteGen.PublishOutputModeV2.pypiOverride({
                username: "rapiddocs",
                password: "rapiddocs1!",
                registryUrl: "https://pypi.com",
                coordinate: `rapiddocs-${fixtureName}`
            });
        case "typescript":
            return RapiddocsFiddle.remoteGen.PublishOutputModeV2.npmOverride({
                token: "rapiddocs1!",
                registryUrl: "https://maven.com",
                packageName: `@rapiddocs/${fixtureName}`
            });
        case "go":
            throw new Error("Seed doesn't support publish mode in Go!");
        case "ruby":
            throw new Error("Seed doesn't support publish mode in Ruby!");
        case "csharp":
            throw new Error("Seed doesn't support publish mode in C#!");
        case "swift":
            throw new Error("Seed doesn't support publish mode in Swift");
        case "php":
            throw new Error("Seed doesn't support publish mode in Swift");
        default:
            assertNever(language);
    }
}
