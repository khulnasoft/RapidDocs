import { RAPIDDOCS_PACKAGE_MARKER_FILENAME } from "@khulnasoft/configuration";
import { Schema } from "@khulnasoft/openapi-ir";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { OpenApiIrConverterContext } from "./OpenApiIrConverterContext";
import { buildTypeReference } from "./buildTypeReference";
import { getGroupNameForSchema } from "./utils/getGroupNameForSchema";
import { getNamespaceFromGroup } from "./utils/getNamespaceFromGroup";
import { getTypeFromTypeReference } from "./utils/getTypeFromTypeReference";

export function buildVariables(context: OpenApiIrConverterContext): void {
    for (const [variable, variableSchema] of Object.entries(context.ir.variables)) {
        const namespace =
            variableSchema.groupName != null ? getNamespaceFromGroup(variableSchema.groupName) : undefined;
        const typeReference = buildTypeReference({
            schema: Schema.primitive(variableSchema),
            context,
            fileContainingReference: RelativeFilePath.of(RAPIDDOCS_PACKAGE_MARKER_FILENAME),
            namespace,
            declarationDepth: 0
        });
        context.builder.addVariable({
            name: variable,
            schema: {
                type: getTypeFromTypeReference(typeReference),
                docs: variableSchema.description ?? undefined
            }
        });
    }
}
