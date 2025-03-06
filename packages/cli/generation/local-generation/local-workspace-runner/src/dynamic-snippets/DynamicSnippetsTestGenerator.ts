import { generatorsYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { dynamic } from "@khulnasoft/ir-sdk";
import { TaskContext } from "@khulnasoft/task-context";

import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

import { DynamicSnippetsTestSuite } from "./DynamicSnippetsTestSuite";
import { DynamicSnippetsGoTestGenerator } from "./go/DynamicSnippetsGoTestGenerator";
import { DynamicSnippetsPhpTestGenerator } from "./php/DynamicSnippetsPhpTestGenerator";
import { DynamicSnippetsTypeScriptTestGenerator } from "./typescript/DynamicSnippetsTypeScriptTestGenerator";

interface DynamicSnippetsGenerator {
    new (
        context: TaskContext,
        ir: dynamic.DynamicIntermediateRepresentation,
        config: RapiddocsGeneratorExec.GeneratorConfig
    ): {
        generateTests(params: {
            outputDir: AbsoluteFilePath;
            requests: dynamic.EndpointSnippetRequest[];
        }): Promise<void>;
    };
}

export class DynamicSnippetsTestGenerator {
    private static readonly GENERATORS: Record<generatorsYml.GenerationLanguage, DynamicSnippetsGenerator | undefined> =
        {
            go: DynamicSnippetsGoTestGenerator,
            php: DynamicSnippetsPhpTestGenerator,
            typescript: undefined, // TODO: Re-enable dynamic snippet tests when example generation is resolved.
            java: undefined,
            python: undefined,
            ruby: undefined,
            csharp: undefined,
            swift: undefined
        };

    constructor(
        private readonly context: TaskContext,
        private readonly testSuite: DynamicSnippetsTestSuite
    ) {}

    public async generateTests({
        outputDir,
        language
    }: {
        outputDir: AbsoluteFilePath;
        language: generatorsYml.GenerationLanguage;
    }): Promise<void> {
        const generator = DynamicSnippetsTestGenerator.GENERATORS[language];
        if (generator == null) {
            this.context.logger.debug(`Skipping dynamic snippets test generation for language "${language}"`);
            return;
        }
        return new generator(this.context, this.testSuite.ir, this.testSuite.config).generateTests({
            outputDir,
            requests: this.testSuite.requests
        });
    }
}
