import { OpenAPIV3 } from "openapi-types";

import { Source } from "@khulnasoft/openapi-ir";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export function getSourceExtension(schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject): Source | undefined {
    const sourceFilepath = getExtension<string>(schema, RapiddocsOpenAPIExtension.SOURCE);
    if (sourceFilepath == null) {
        return undefined;
    }
    if (sourceFilepath.endsWith(".proto")) {
        return Source.protobuf({ file: sourceFilepath });
    }
    return Source.openapi({ file: sourceFilepath });
}
