import { NpmPackage, PersistedTypescriptProject, constructNpmPackage } from "@rapiddocs-typescript/commons";
import { GeneratorContext } from "@rapiddocs-typescript/contexts";

import {
    RapiddocsGeneratorExec,
    GeneratorNotificationService,
    parseGeneratorConfig,
    parseIR
} from "@khulnasoft/base-generator";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { CONSOLE_LOGGER, LogLevel, Logger, createLogger } from "@khulnasoft/logger";

import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";
import * as serializers from "@rapiddocs-rapiddocs/ir-sdk/serialization";

import { publishPackage } from "./publishPackage";
import { writeGitHubWorkflows } from "./writeGitHubWorkflows";

const OUTPUT_ZIP_FILENAME = "output.zip";

const LOG_LEVEL_CONVERSIONS: Record<LogLevel, RapiddocsGeneratorExec.logging.LogLevel> = {
    [LogLevel.Trace]: RapiddocsGeneratorExec.logging.LogLevel.Debug,
    [LogLevel.Debug]: RapiddocsGeneratorExec.logging.LogLevel.Debug,
    [LogLevel.Info]: RapiddocsGeneratorExec.logging.LogLevel.Info,
    [LogLevel.Warn]: RapiddocsGeneratorExec.logging.LogLevel.Warn,
    [LogLevel.Error]: RapiddocsGeneratorExec.logging.LogLevel.Error
};

export abstract class AbstractGeneratorCli<CustomConfig> {
    public async runCli(): Promise<void> {
        const pathToConfig = process.argv[process.argv.length - 1];
        if (pathToConfig == null) {
            throw new Error("No argument for config filepath.");
        }
        await this.run(pathToConfig);
    }

    public async run(pathToConfig: string): Promise<void> {
        const config = await parseGeneratorConfig(pathToConfig);
        const generatorNotificationService = new GeneratorNotificationService(config.environment);

        try {
            const customConfig = this.parseCustomConfig(config.customConfig);

            const logger = createLogger((level, ...message) => {
                CONSOLE_LOGGER.log(level, ...message);

                // kick off log, but don't wait for it
                generatorNotificationService.bufferUpdate(
                    RapiddocsGeneratorExec.GeneratorUpdate.log({
                        message: message.join(" "),
                        level: LOG_LEVEL_CONVERSIONS[level]
                    })
                );
            });

            const npmPackage = constructNpmPackage({
                generatorConfig: config,
                isPackagePrivate: this.isPackagePrivate(customConfig)
            });

            await generatorNotificationService.sendUpdate(
                RapiddocsGeneratorExec.GeneratorUpdate.initV2({
                    publishingToRegistry:
                        npmPackage?.publishInfo != null ? RapiddocsGeneratorExec.RegistryType.Npm : undefined
                })
            );

            const version = config.output?.mode._visit({
                downloadFiles: () => undefined,
                github: (github) => github.version,
                publish: (publish) => publish.version,
                _other: () => undefined
            });

            const generatorContext = new GeneratorContextImpl(logger, version);
            const typescriptProject = await this.generateTypescriptProject({
                config,
                customConfig,
                npmPackage,
                generatorContext,
                intermediateRepresentation: await parseIR({
                    absolutePathToIR: AbsoluteFilePath.of(config.irFilepath),
                    parse: serializers.IntermediateRepresentation.parse
                })
            });
            if (!generatorContext.didSucceed()) {
                throw new Error("Failed to generate TypeScript project.");
            }

            const destinationZip = join(
                AbsoluteFilePath.of(config.output.path),
                RelativeFilePath.of(OUTPUT_ZIP_FILENAME)
            );
            await config.output.mode._visit<void | Promise<void>>({
                publish: async () => {
                    await publishPackage({
                        logger,
                        npmPackage,
                        dryRun: config.dryRun,
                        generatorNotificationService,
                        typescriptProject,
                        shouldTolerateRepublish: this.shouldTolerateRepublish(customConfig)
                    });
                    await typescriptProject.npmPackAsZipTo({
                        logger,
                        destinationZip
                    });
                },
                github: async (githubOutputMode) => {
                    await typescriptProject.format(logger);
                    await typescriptProject.deleteGitIgnoredFiles(logger);
                    await typescriptProject.writeArbitraryFiles(async (pathToProject) => {
                        await writeGitHubWorkflows({
                            githubOutputMode,
                            isPackagePrivate: npmPackage != null && npmPackage.private,
                            pathToProject,
                            config,
                            publishToJsr: this.publishToJsr(customConfig)
                        });
                    });

                    await typescriptProject.copyProjectAsZipTo({
                        logger,
                        destinationZip
                    });
                },
                downloadFiles: async () => {
                    if (this.outputSourceFiles(customConfig)) {
                        await typescriptProject.copySrcAsZipTo({
                            destinationZip,
                            logger
                        });
                    } else {
                        await typescriptProject.copyDistAsZipTo({
                            destinationZip,
                            logger
                        });
                    }
                },
                _other: ({ type }) => {
                    throw new Error(`${type} mode is not implemented`);
                }
            });

            await generatorNotificationService.sendUpdate(
                RapiddocsGeneratorExec.GeneratorUpdate.exitStatusUpdate(
                    RapiddocsGeneratorExec.ExitStatusUpdate.successful({
                        zipFilename: OUTPUT_ZIP_FILENAME
                    })
                )
            );
            // eslint-disable-next-line no-console
            console.log("Sent success event to coordinator");
        } catch (e) {
            await generatorNotificationService.sendUpdate(
                RapiddocsGeneratorExec.GeneratorUpdate.exitStatusUpdate(
                    RapiddocsGeneratorExec.ExitStatusUpdate.error({
                        message: e instanceof Error ? e.message : "Encountered error"
                    })
                )
            );
            // eslint-disable-next-line no-console
            console.log("Sent error event to coordinator");
            throw e;
        }
    }

    protected abstract parseCustomConfig(customConfig: unknown): CustomConfig;
    protected abstract generateTypescriptProject(args: {
        config: RapiddocsGeneratorExec.GeneratorConfig;
        customConfig: CustomConfig;
        npmPackage: NpmPackage | undefined;
        generatorContext: GeneratorContext;
        intermediateRepresentation: IntermediateRepresentation;
    }): Promise<PersistedTypescriptProject>;
    protected abstract isPackagePrivate(customConfig: CustomConfig): boolean;
    protected abstract publishToJsr(customConfig: CustomConfig): boolean;
    protected abstract outputSourceFiles(customConfig: CustomConfig): boolean;
    protected abstract shouldTolerateRepublish(customConfig: CustomConfig): boolean;
}

class GeneratorContextImpl implements GeneratorContext {
    private isSuccess = true;

    constructor(
        public readonly logger: Logger,
        public readonly version: string | undefined
    ) {}

    public fail(): void {
        this.isSuccess = false;
    }

    public didSucceed(): boolean {
        return this.isSuccess;
    }
}
