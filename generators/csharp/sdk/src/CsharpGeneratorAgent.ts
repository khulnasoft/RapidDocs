import { AbstractGeneratorAgent } from "@khulnasoft/base-generator";
import { Logger } from "@khulnasoft/logger";

import { RapiddocsGeneratorCli } from "@rapiddocs-rapiddocs/generator-cli-sdk";
import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

import { SdkGeneratorContext } from "./SdkGeneratorContext";
import { ReadmeConfigBuilder } from "./readme/ReadmeConfigBuilder";

export class CsharpGeneratorAgent extends AbstractGeneratorAgent<SdkGeneratorContext> {
    private readmeConfigBuilder: ReadmeConfigBuilder;

    public constructor({
        logger,
        config,
        readmeConfigBuilder
    }: {
        logger: Logger;
        config: RapiddocsGeneratorExec.GeneratorConfig;
        readmeConfigBuilder: ReadmeConfigBuilder;
    }) {
        super({ logger, config });
        this.readmeConfigBuilder = readmeConfigBuilder;
    }

    public getReadmeConfig(
        args: AbstractGeneratorAgent.ReadmeConfigArgs<SdkGeneratorContext>
    ): RapiddocsGeneratorCli.ReadmeConfig {
        return this.readmeConfigBuilder.build({
            context: args.context,
            remote: args.remote,
            featureConfig: args.featureConfig,
            endpointSnippets: args.endpointSnippets
        });
    }

    public getLanguage(): RapiddocsGeneratorCli.Language {
        return RapiddocsGeneratorCli.Language.Csharp;
    }
}
