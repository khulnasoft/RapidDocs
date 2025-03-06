import { generatorsYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { IntermediateRepresentation } from "@khulnasoft/ir-sdk";
import { TaskContext } from "@khulnasoft/task-context";

import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

import { DynamicSnippetsTestGenerator } from "./DynamicSnippetsTestGenerator";
import { generateDynamicSnippetsTestSuite } from "./generateDynamicSnippetsTestSuite";

export async function generateDynamicSnippetTests({
    context,
    ir,
    config,
    language,
    outputDir
}: {
    context: TaskContext;
    ir: IntermediateRepresentation;
    config: RapiddocsGeneratorExec.GeneratorConfig;
    language: generatorsYml.GenerationLanguage;
    outputDir: AbsoluteFilePath;
}): Promise<void> {
    const testSuite = await generateDynamicSnippetsTestSuite({ ir, config });
    return new DynamicSnippetsTestGenerator(context, testSuite).generateTests({ language, outputDir });
}
