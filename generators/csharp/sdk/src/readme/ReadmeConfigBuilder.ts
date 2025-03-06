import { RapiddocsGeneratorCli } from "@rapiddocs-rapiddocs/generator-cli-sdk";
import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

import { SdkGeneratorContext } from "../SdkGeneratorContext";
import { ReadmeSnippetBuilder } from "./ReadmeSnippetBuilder";

export class ReadmeConfigBuilder {
    public build({
        context,
        remote,
        featureConfig,
        endpointSnippets
    }: {
        context: SdkGeneratorContext;
        remote: RapiddocsGeneratorCli.Remote | undefined;
        featureConfig: RapiddocsGeneratorCli.FeatureConfig;
        endpointSnippets: RapiddocsGeneratorExec.Endpoint[];
    }): RapiddocsGeneratorCli.ReadmeConfig {
        const readmeSnippetBuilder = new ReadmeSnippetBuilder({
            context,
            endpointSnippets
        });
        const snippets = readmeSnippetBuilder.buildReadmeSnippets();
        const features: RapiddocsGeneratorCli.ReadmeFeature[] = [];
        for (const feature of featureConfig.features) {
            const featureSnippets = snippets[feature.id];
            if (!featureSnippets) {
                continue;
            }
            features.push({
                id: feature.id,
                advanced: feature.advanced,
                description: feature.description,
                snippets: featureSnippets,
                snippetsAreOptional: false
            });
        }
        return {
            remote,
            language: this.getLanguageInfo({ context }),
            organization: context.config.organization,
            apiReferenceLink: context.ir.readmeConfig?.apiReferenceLink,
            bannerLink: context.ir.readmeConfig?.bannerLink,
            features
        };
    }

    private getLanguageInfo({ context }: { context: SdkGeneratorContext }): RapiddocsGeneratorCli.LanguageInfo {
        return RapiddocsGeneratorCli.LanguageInfo.csharp({
            publishInfo: {
                packageName: context.getPackageId()
            }
        });
    }
}
