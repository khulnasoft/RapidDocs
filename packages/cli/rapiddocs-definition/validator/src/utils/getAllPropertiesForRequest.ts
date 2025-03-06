import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { RawSchemas, isInlineRequestBody } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/fs-utils";
import {
    ObjectPropertyWithPath,
    TypeResolverImpl,
    getAllPropertiesForObject,
    getAllPropertiesForType
} from "@khulnasoft/ir-generator";

export function getAllPropertiesForRequest({
    endpoint,
    filepath,
    definitionFile,
    workspace
}: {
    endpoint: RawSchemas.HttpEndpointSchema;
    filepath: RelativeFilePath;
    definitionFile: RawSchemas.DefinitionFileSchema;
    workspace: RapiddocsWorkspace;
}): ObjectPropertyWithPath[] | undefined {
    if (endpoint.request == null) {
        return undefined;
    }

    const typeResolver = new TypeResolverImpl(workspace);

    if (typeof endpoint.request === "string") {
        return getAllPropertiesForType({
            typeName: endpoint.request,
            filepathOfDeclaration: filepath,
            definitionFile,
            workspace,
            typeResolver,
            smartCasing: false
        });
    }

    if (endpoint.request.body == null) {
        return undefined;
    }

    if (typeof endpoint.request.body === "string" || !isInlineRequestBody(endpoint.request.body)) {
        return getAllPropertiesForType({
            typeName: typeof endpoint.request.body === "string" ? endpoint.request.body : endpoint.request.body.type,
            filepathOfDeclaration: filepath,
            definitionFile,
            workspace,
            typeResolver,
            smartCasing: false
        });
    }

    return getAllPropertiesForObject({
        typeName: undefined,
        objectDeclaration: {
            extends: endpoint.request.body.extends,
            properties: endpoint.request.body.properties ?? {}
        },
        filepathOfDeclaration: filepath,
        definitionFile,
        workspace,
        typeResolver,
        smartCasing: false
    });
}
