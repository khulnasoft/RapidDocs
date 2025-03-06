import { ExportedFilePath } from "@rapiddocs-typescript/commons";
import { SdkContext } from "@rapiddocs-typescript/contexts";

import { AbstractGeneratorAgent } from "@khulnasoft/base-generator";
import { Logger } from "@khulnasoft/logger";

import { RapiddocsGeneratorCli } from "@rapiddocs-rapiddocs/generator-cli-sdk";
import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

import { ReadmeConfigBuilder } from "./readme/ReadmeConfigBuilder";

export class TypeScriptGeneratorAgent extends AbstractGeneratorAgent<SdkContext> {
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

    public getReadmeConfig(args: AbstractGeneratorAgent.ReadmeConfigArgs<SdkContext>): RapiddocsGeneratorCli.ReadmeConfig {
        return this.readmeConfigBuilder.build({
            context: args.context,
            remote: args.remote,
            featureConfig: args.featureConfig
        });
    }

    public getLanguage(): RapiddocsGeneratorCli.Language {
        return RapiddocsGeneratorCli.Language.Typescript;
    }

    public getExportedReadmeFilePath(): ExportedFilePath {
        return {
            directories: [],
            file: {
                nameOnDisk: this.README_FILENAME
            },
            rootDir: ""
        };
    }

    public getExportedReferenceFilePath(): ExportedFilePath {
        return {
            directories: [],
            file: {
                nameOnDisk: this.REFERENCE_FILENAME
            },
            rootDir: ""
        };
    }
}
