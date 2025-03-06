import {
    AbstractDynamicSnippetsGenerator,
    AbstractFormatter,
    RapiddocsGeneratorExec
} from "@khulnasoft/browser-compatible-base-generator";
import { RapiddocsIr } from "@fern-api/dynamic-ir-sdk";

import { EndpointSnippetGenerator } from "./EndpointSnippetGenerator";
import { DynamicSnippetsGeneratorContext } from "./context/DynamicSnippetsGeneratorContext";

export class DynamicSnippetsGenerator extends AbstractDynamicSnippetsGenerator<
    DynamicSnippetsGeneratorContext,
    EndpointSnippetGenerator
> {
    private formatter: AbstractFormatter | undefined;

    constructor({
        ir,
        config,
        formatter
    }: {
        ir: RapiddocsIr.dynamic.DynamicIntermediateRepresentation;
        config: RapiddocsGeneratorExec.GeneratorConfig;
        formatter?: AbstractFormatter;
    }) {
        super(new DynamicSnippetsGeneratorContext({ ir, config }));
        this.formatter = formatter;
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
        return new EndpointSnippetGenerator({ context, formatter: this.formatter });
    }
}
