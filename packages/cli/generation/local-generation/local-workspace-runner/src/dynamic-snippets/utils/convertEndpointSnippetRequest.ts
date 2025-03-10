import { dynamic } from "@khulnasoft/ir-sdk";

export type EndpointSnippetRequest = Omit<dynamic.EndpointSnippetRequest, "baseUrl"> & {
    baseURL: string | undefined;
};

/**
 * The @fern-api/dynamic-ir-sdk doesn't include the serialization layer, so the casing
 * convention doesn't match.
 */
export function convertDynamicEndpointSnippetRequest(request: dynamic.EndpointSnippetRequest): EndpointSnippetRequest {
    return {
        ...request,
        baseURL: request.baseUrl
    };
}
