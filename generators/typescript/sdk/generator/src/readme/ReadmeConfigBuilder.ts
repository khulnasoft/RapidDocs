import { NpmPackage } from "@rapiddocs-typescript/commons";
import { SdkContext } from "@rapiddocs-typescript/contexts";

import { RapiddocsGeneratorCli } from "@rapiddocs-rapiddocs/generator-cli-sdk";
import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

import { ReadmeSnippetBuilder } from "./ReadmeSnippetBuilder";

export class ReadmeConfigBuilder {
    private endpointSnippets: RapiddocsGeneratorExec.Endpoint[];

    constructor({ endpointSnippets }: { endpointSnippets: RapiddocsGeneratorExec.Endpoint[] }) {
        this.endpointSnippets = endpointSnippets;
    }

    public build({
        context,
        remote,
        featureConfig
    }: {
        context: SdkContext;
        remote: RapiddocsGeneratorCli.Remote | undefined;
        featureConfig: RapiddocsGeneratorCli.FeatureConfig;
    }): RapiddocsGeneratorCli.ReadmeConfig {
        const readmeSnippetBuilder = new ReadmeSnippetBuilder({
            context,
            endpointSnippets: this.endpointSnippets
        });
        const snippets = readmeSnippetBuilder.buildReadmeSnippets();
        const features: RapiddocsGeneratorCli.ReadmeFeature[] = [];
        for (const feature of featureConfig.features) {
            const snippetForFeature = snippets[feature.id];
            if (snippetForFeature == null) {
                continue;
            }
            features.push({
                id: feature.id,
                advanced: feature.advanced,
                description: feature.description,
                snippets: snippetForFeature,
                snippetsAreOptional: false
            });
        }
        return {
            remote,
            language: this.getLanguageInfo({ npmPackage: context.npmPackage }),
            organization: context.config.organization,
            apiReferenceLink: context.ir.readmeConfig?.apiReferenceLink,
            bannerLink: context.ir.readmeConfig?.bannerLink,
            referenceMarkdownPath: "./reference.md",
            features
        };
    }

    private getLanguageInfo({ npmPackage }: { npmPackage: NpmPackage | undefined }): RapiddocsGeneratorCli.LanguageInfo {
        if (npmPackage != null) {
            return RapiddocsGeneratorCli.LanguageInfo.typescript({
                publishInfo: {
                    packageName: npmPackage.packageName
                }
            });
        }
        return RapiddocsGeneratorCli.LanguageInfo.typescript({});
    }
}
