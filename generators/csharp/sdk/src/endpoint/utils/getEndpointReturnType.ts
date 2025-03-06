import { csharp } from "@khulnasoft/csharp-codegen";

import { HttpEndpoint } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { SdkGeneratorContext } from "../../SdkGeneratorContext";

export function getEndpointReturnType({
    context,
    endpoint
}: {
    context: SdkGeneratorContext;
    endpoint: HttpEndpoint;
}): csharp.Type | undefined {
    if (endpoint.response?.body == null) {
        return undefined;
    }
    return endpoint.response.body._visit({
        streamParameter: () => undefined,
        fileDownload: () => undefined,
        json: (reference) => {
            return context.csharpTypeMapper.convert({ reference: reference.responseBodyType });
        },
        streaming: () => undefined,
        text: () => csharp.Type.string(),
        bytes: () => undefined,
        _other: () => undefined
    });
}
