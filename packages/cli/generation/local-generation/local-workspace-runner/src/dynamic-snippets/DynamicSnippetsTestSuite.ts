import { dynamic as DynamicSnippets } from "@khulnasoft/ir-sdk";

import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

export interface DynamicSnippetsTestSuite {
    ir: DynamicSnippets.DynamicIntermediateRepresentation;
    config: RapiddocsGeneratorExec.GeneratorConfig;
    requests: DynamicSnippets.EndpointSnippetRequest[];
}
