import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { QueryParameter } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../../RapiddocsFileContext";
import { convertDeclaration } from "../convertDeclaration";

export function convertQueryParameter({
    file,
    queryParameterKey,
    queryParameter
}: {
    file: RapiddocsFileContext;
    queryParameterKey: string;
    queryParameter: RawSchemas.HttpQueryParameterSchema;
}): QueryParameter {
    const { name } = getQueryParameterName({ queryParameterKey, queryParameter });
    const valueType = file.parseTypeReference(queryParameter);
    return {
        ...convertDeclaration(queryParameter),
        name: file.casingsGenerator.generateNameAndWireValue({
            wireValue: queryParameterKey,
            name
        }),
        valueType,
        allowMultiple:
            typeof queryParameter !== "string" && queryParameter["allow-multiple"] != null
                ? queryParameter["allow-multiple"]
                : false
    };
}

export function getQueryParameterName({
    queryParameterKey,
    queryParameter
}: {
    queryParameterKey: string;
    queryParameter: RawSchemas.HttpQueryParameterSchema;
}): { name: string; wasExplicitlySet: boolean } {
    if (typeof queryParameter !== "string") {
        if (queryParameter.name != null) {
            return { name: queryParameter.name, wasExplicitlySet: true };
        }
    }
    return { name: queryParameterKey, wasExplicitlySet: false };
}
