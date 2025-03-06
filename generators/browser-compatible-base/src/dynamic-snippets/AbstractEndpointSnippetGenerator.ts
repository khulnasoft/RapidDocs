import { RapiddocsIr } from "@fern-api/dynamic-ir-sdk";

import { AbstractDynamicSnippetsGeneratorContext } from "./AbstractDynamicSnippetsGeneratorContext";

export abstract class AbstractEndpointSnippetGenerator<Context extends AbstractDynamicSnippetsGeneratorContext> {
    public abstract generateSnippet({
        endpoint,
        request
    }: {
        endpoint: RapiddocsIr.dynamic.Endpoint;
        request: RapiddocsIr.dynamic.EndpointSnippetRequest;
    }): Promise<string>;

    public abstract generateSnippetSync({
        endpoint,
        request
    }: {
        endpoint: RapiddocsIr.dynamic.Endpoint;
        request: RapiddocsIr.dynamic.EndpointSnippetRequest;
    }): string;
}
