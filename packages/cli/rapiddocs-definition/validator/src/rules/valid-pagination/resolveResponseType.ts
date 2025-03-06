import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { RapiddocsFileContext, ResolvedType, TypeResolver } from "@khulnasoft/ir-generator";

export function resolveResponseType({
    endpoint,
    typeResolver,
    file
}: {
    endpoint: RawSchemas.HttpEndpointSchema;
    typeResolver: TypeResolver;
    file: RapiddocsFileContext;
}): ResolvedType | undefined {
    const responseType = typeof endpoint.response !== "string" ? endpoint.response?.type : endpoint.response;
    if (responseType == null) {
        return undefined;
    }
    return typeResolver.resolveType({
        type: responseType,
        file
    });
}
