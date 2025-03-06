import { cp, mkdir, writeFile } from "fs/promises";
import path from "path";

import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { APIS_DIRECTORY, RAPIDDOCS_DIRECTORY, generatorsYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { Semaphore } from "../../../Semaphore";
import { Stopwatch } from "../../../Stopwatch";
import { FixtureConfigurations, OutputMode } from "../../../config/api";
import { GeneratorWorkspace } from "../../../loadGeneratorWorkspaces";
import { convertGeneratorWorkspaceToRapiddocsWorkspace } from "../../../utils/convertSeedWorkspaceToRapiddocsWorkspace";
import { ParsedDockerName, parseDockerOrThrow } from "../../../utils/parseDockerOrThrow";
import { workspaceShouldGenerateDynamicSnippetTests } from "../../../workspaceShouldGenerateDynamicSnippetTests";
import { ScriptRunner } from "../ScriptRunner";
import { TaskContextFactory } from "../TaskContextFactory";

export declare namespace TestRunner {
    interface Args {
        generator: GeneratorWorkspace;
        lock: Semaphore;
        taskContextFactory: TaskContextFactory;
        skipScripts: boolean;
        scriptRunner: ScriptRunner;
        keepDocker: boolean;
    }

    interface RunArgs {
        /** The fixture to run the generator on **/
        fixture: string;
        /** Configuration specific to the fixture **/
        configuration: FixtureConfigurations | undefined;
    }

    interface DoRunArgs {
        id: string;
        rapiddocsWorkspace: RapiddocsWorkspace;
        fixture: string;
        irVersion: string;
        outputVersion: string | undefined;
        language: generatorsYml.GenerationLanguage | undefined;
        customConfig: unknown;
        publishConfig: unknown;
        selectAudiences?: string[];
        taskContext: TaskContext;
        outputDir: AbsoluteFilePath;
        absolutePathToWorkspace: AbsoluteFilePath;
        absolutePathToRapiddocsDefinition: AbsoluteFilePath;
        outputMode: OutputMode;
        outputFolder: string;
        keepDocker: boolean | undefined;
        publishMetadata: unknown;
        readme: generatorsYml.ReadmeSchema | undefined;
        shouldGenerateDynamicSnippetTests: boolean | undefined;
    }

    type TestResult = TestSuccess | TestFailure;

    interface TestSuccess {
        type: "success";
        id: string;
        outputFolder: string;
        metrics: TestCaseMetrics;
    }

    interface TestFailure {
        type: "failure";
        cause: "invalid-fixture" | "generation" | "compile";
        message?: string;
        id: string;
        outputFolder: string;
        metrics: TestCaseMetrics;
    }

    interface TestCaseMetrics {
        /** The time it takes to generate code via the generator */
        generationTime?: string;
        /** The time it takes to verify/compile the code */
        compileTime?: string;
    }
}

export abstract class TestRunner {
    private buildInvocation: Promise<void> | undefined;
    protected readonly generator: GeneratorWorkspace;
    protected readonly lock: Semaphore;
    protected readonly taskContextFactory: TaskContextFactory;
    private readonly skipScripts: boolean;
    private readonly keepDocker: boolean;
    private scriptRunner: ScriptRunner;

    constructor({ generator, lock, taskContextFactory, skipScripts, keepDocker, scriptRunner }: TestRunner.Args) {
        this.generator = generator;
        this.lock = lock;
        this.taskContextFactory = taskContextFactory;
        this.skipScripts = skipScripts;
        this.keepDocker = keepDocker;
        this.scriptRunner = scriptRunner;
    }

    /**
     * Builds the generator.
     */
    public abstract build(): Promise<void>;

    /**
     * Runs the generator.
     */
    public async run({ fixture, configuration }: TestRunner.RunArgs): Promise<TestRunner.TestResult> {
        try {
            if (this.buildInvocation == null) {
                this.buildInvocation = this.build();
            }
            await this.buildInvocation;

            const metrics: TestRunner.TestCaseMetrics = {};

            const id = configuration != null ? `${fixture}:${configuration.outputFolder}` : `${fixture}`;
            const absolutePathToAPIDefinition = AbsoluteFilePath.of(
                path.join(__dirname, RAPIDDOCS_DIRECTORY, APIS_DIRECTORY, fixture)
            );
            const taskContext = this.taskContextFactory.create(`${this.generator.workspaceName}:${id}`);
            const outputFolder = configuration?.outputFolder ?? fixture;
            const outputDir =
                configuration == null
                    ? join(this.generator.absolutePathToWorkspace, RelativeFilePath.of(fixture))
                    : join(
                          this.generator.absolutePathToWorkspace,
                          RelativeFilePath.of(fixture),
                          RelativeFilePath.of(configuration.outputFolder)
                      );
            const language = this.generator.workspaceConfig.language;
            const outputVersion = configuration?.outputVersion ?? "0.0.1";
            const customConfig =
                this.generator.workspaceConfig.defaultCustomConfig != null || configuration?.customConfig != null
                    ? {
                          ...(this.generator.workspaceConfig.defaultCustomConfig ?? {}),
                          ...((configuration?.customConfig as Record<string, unknown>) ?? {})
                      }
                    : undefined;
            const publishConfig = configuration?.publishConfig;
            const outputMode = configuration?.outputMode ?? this.generator.workspaceConfig.defaultOutputMode;
            const irVersion = this.generator.workspaceConfig.irVersion;
            const publishMetadata = configuration?.publishMetadata ?? undefined;
            const readme = configuration?.readmeConfig ?? undefined;
            const rapiddocsWorkspace = await (
                await convertGeneratorWorkspaceToRapiddocsWorkspace({
                    absolutePathToAPIDefinition,
                    taskContext,
                    fixture
                })
            )?.toRapiddocsWorkspace({ context: taskContext });
            if (rapiddocsWorkspace == null) {
                return {
                    type: "failure",
                    cause: "invalid-fixture",
                    message: `Failed to validate fixture ${fixture}`,
                    id: fixture,
                    outputFolder,
                    metrics
                };
            }

            taskContext.logger.debug("Acquiring lock...");
            await this.lock.acquire();
            taskContext.logger.info("Running generator...");
            try {
                const generationStopwatch = new Stopwatch();
                generationStopwatch.start();
                await this.runGenerator({
                    id,
                    absolutePathToRapiddocsDefinition: absolutePathToAPIDefinition,
                    absolutePathToWorkspace: this.generator.absolutePathToWorkspace,
                    rapiddocsWorkspace,
                    irVersion,
                    outputVersion,
                    language,
                    selectAudiences: configuration?.audiences,
                    fixture,
                    customConfig,
                    publishConfig,
                    taskContext,
                    outputDir,
                    outputMode,
                    outputFolder,
                    keepDocker: this.keepDocker,
                    publishMetadata,
                    readme,
                    shouldGenerateDynamicSnippetTests: workspaceShouldGenerateDynamicSnippetTests(this.generator)
                });
                generationStopwatch.stop();
                metrics.generationTime = generationStopwatch.duration();
                taskContext.logger.info("Writing .mock directory...");
                await writeDotMock({
                    absolutePathToDotMockDirectory: outputDir,
                    absolutePathToRapiddocsDefinition: absolutePathToAPIDefinition
                });
                taskContext.logger.info("Successfully wrote .mock directory...");
            } catch (error) {
                taskContext.logger.error(`Generation failed: ${(error as Error)?.message ?? "Unknown error"}`);
                taskContext.logger.error(`${(error as Error)?.stack}`);
                return {
                    type: "failure",
                    cause: "generation",
                    id: fixture,
                    outputFolder,
                    metrics
                };
            }

            if (this.skipScripts) {
                return {
                    type: "success",
                    id: fixture,
                    outputFolder,
                    metrics
                };
            }

            const scriptStopwatch = new Stopwatch();
            scriptStopwatch.start();

            const scriptResponse = await this.scriptRunner.run({ taskContext, outputDir, id });

            scriptStopwatch.stop();
            metrics.compileTime = scriptStopwatch.duration();

            if (scriptResponse.type === "failure") {
                return {
                    type: "failure",
                    cause: "compile",
                    id: fixture,
                    outputFolder,
                    metrics
                };
            }
            return {
                type: "success",
                id: fixture,
                outputFolder,
                metrics
            };
        } finally {
            this.lock.release();
        }
    }

    /**
     *
     */
    public abstract runGenerator(args: TestRunner.DoRunArgs): Promise<void>;

    protected getParsedDockerName(): ParsedDockerName {
        return parseDockerOrThrow(this.generator.workspaceConfig.test.docker.image);
    }
}

// Copy Rapiddocs definition to output directory
export async function writeDotMock({
    absolutePathToDotMockDirectory,
    absolutePathToRapiddocsDefinition
}: {
    absolutePathToDotMockDirectory: AbsoluteFilePath;
    absolutePathToRapiddocsDefinition: AbsoluteFilePath;
}): Promise<void> {
    if (absolutePathToRapiddocsDefinition != null) {
        await cp(`${absolutePathToRapiddocsDefinition}`, `${absolutePathToDotMockDirectory}/.mock`, {
            recursive: true
        });
    }
    await mkdir(`${absolutePathToDotMockDirectory}/.mock`, { recursive: true });
    await writeFile(
        `${absolutePathToDotMockDirectory}/.mock/rapiddocs.config.json`,
        '{"organization": "rapiddocs-test", "version": "*"}'
    );
}
