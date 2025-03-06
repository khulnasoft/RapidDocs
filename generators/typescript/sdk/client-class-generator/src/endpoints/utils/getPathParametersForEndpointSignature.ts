import { SdkContext } from "@rapiddocs-typescript/contexts";

import { HttpEndpoint, HttpService, PathParameter } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { getNonVariablePathParameters } from "./getNonVariablePathParameters";

export function getPathParametersForEndpointSignature({
    service,
    endpoint,
    context
}: {
    service: HttpService;
    endpoint: HttpEndpoint;
    context: SdkContext;
}): PathParameter[] {
    const shouldInlinePathParameters = context.requestWrapper.shouldInlinePathParameters(endpoint.sdkRequest);
    return shouldInlinePathParameters
        ? []
        : getNonVariablePathParameters([...service.pathParameters, ...endpoint.pathParameters]);
}
