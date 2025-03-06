import { readFile } from "fs/promises";
import yaml from "js-yaml";
import path from "path";

import { AbstractGeneratorContext, RapiddocsGeneratorExec } from "@khulnasoft/browser-compatible-base-generator";
import { Logger } from "@khulnasoft/logger";

import { RapiddocsGeneratorCli } from "@rapiddocs-rapiddocs/generator-cli-sdk";

import { GeneratorAgentClient } from "./GeneratorAgentClient";
import { ReferenceConfigBuilder } from "./reference";

const DOCKER_FEATURES_CONFIG_PATH = "/assets/features.yml";

export declare namespace AbstractGeneratorAgent {
    interface ReadmeConfigArgs<GeneratorContext extends AbstractGeneratorContext> {
        context: GeneratorContext;
        remote: RapiddocsGeneratorCli.Remote | undefined;
        featureConfig: RapiddocsGeneratorCli.FeatureConfig;
        endpointSnippets: RapiddocsGeneratorExec.Endpoint[];
    }
}

export abstract class AbstractGeneratorAgent<GeneratorContext extends AbstractGeneratorContext> {
    public README_FILENAME = "README.md";
    public REFERENCE_FILENAME = "reference.md";

    private logger: Logger;
    private config: RapiddocsGeneratorExec.GeneratorConfig;
    private cli: GeneratorAgentClient;

    public constructor({ logger, config }: { logger: Logger; config: RapiddocsGeneratorExec.GeneratorConfig }) {
        this.logger = logger;
        this.config = config;
        this.cli = new GeneratorAgentClient({
            logger
        });
    }

    /**
     * Generates the README.md content using the given generator context.
     */
    public async generateReadme({
        context,
        endpointSnippets
    }: {
        context: GeneratorContext;
        endpointSnippets: RapiddocsGeneratorExec.Endpoint[];
    }): Promise<string> {
        const readmeConfig = this.getReadmeConfig({
            context,
            remote: this.getRemote(),
            featureConfig: await this.readFeatureConfig(),
            endpointSnippets
        });
        return this.cli.generateReadme({ readmeConfig });
    }

    /**
     * Generates the reference.md content using the given builder.
     */
    public async generateReference(builder: ReferenceConfigBuilder): Promise<string> {
        const referenceConfig = builder.build(this.getLanguage());
        return this.cli.generateReference({ referenceConfig });
    }

    /**
     * Gets the language of the generator.
     */
    protected abstract getLanguage(): RapiddocsGeneratorCli.Language;

    /**
     * Gets the README.md configuration.
     */
    protected abstract getReadmeConfig(
        args: AbstractGeneratorAgent.ReadmeConfigArgs<GeneratorContext>
    ): RapiddocsGeneratorCli.ReadmeConfig;

    private async readFeatureConfig(): Promise<RapiddocsGeneratorCli.FeatureConfig> {
        this.logger.debug("Reading feature configuration ...");
        const rawContents = await readFile(this.getFeaturesConfigPath(), "utf8");
        if (rawContents.length === 0) {
            throw new Error("Internal error; failed to read feature configuration");
        }
        return yaml.load(rawContents) as RapiddocsGeneratorCli.FeatureConfig;
    }

    private getRemote(): RapiddocsGeneratorCli.Remote | undefined {
        const outputMode = this.config.output.mode.type === "github" ? this.config.output.mode : undefined;
        if (outputMode?.repoUrl != null && outputMode?.installationToken != null) {
            return RapiddocsGeneratorCli.Remote.github({
                repoUrl: outputMode.repoUrl,
                installationToken: outputMode.installationToken
            });
        }
        return undefined;
    }

    private getFeaturesConfigPath(): string {
        if (process.env.NODE_ENV === "test") {
            return path.join(__dirname, "../../features.yml");
        }
        return DOCKER_FEATURES_CONFIG_PATH;
    }
}
