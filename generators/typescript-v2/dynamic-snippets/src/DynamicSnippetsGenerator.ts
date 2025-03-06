import { AbstractDynamicSnippetsGenerator, RapiddocsGeneratorExec } from "@khulnasoft/browser-compatible-base-generator";
import { RapiddocsIr } from "@fern-api/dynamic-ir-sdk";

import { EndpointSnippetGenerator } from "./EndpointSnippetGenerator";
import { DynamicSnippetsGeneratorContext } from "./context/DynamicSnippetsGeneratorContext";

export class DynamicSnippetsGenerator extends AbstractDynamicSnippetsGenerator<
    DynamicSnippetsGeneratorContext,
    EndpointSnippetGenerator
> {
    constructor({
        ir,
        config
    }: {
        ir: RapiddocsIr.dynamic.DynamicIntermediateRepresentation;
        config: RapiddocsGeneratorExec.GeneratorConfig;
    }) {
        super(new DynamicSnippetsGeneratorContext({ ir, config }));
    }

    public async generate(
        request: RapiddocsIr.dynamic.EndpointSnippetRequest
    ): Promise<RapiddocsIr.dynamic.EndpointSnippetResponse> {
        return super.generate(request);
    }

    public generateSync(request: RapiddocsIr.dynamic.EndpointSnippetRequest): RapiddocsIr.dynamic.EndpointSnippetResponse {
        return super.generateSync(request);
    }

    protected createSnippetGenerator(context: DynamicSnippetsGeneratorContext): EndpointSnippetGenerator {
        return new EndpointSnippetGenerator({ context });
    }
}
