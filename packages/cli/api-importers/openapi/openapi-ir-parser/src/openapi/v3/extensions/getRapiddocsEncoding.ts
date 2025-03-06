import { OpenAPIV3 } from "openapi-types";

import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Logger } from "@khulnasoft/logger";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export function getRapiddocsEncoding({
    schema,
    logger
}: {
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
    logger: Logger;
}): RawSchemas.EncodingSchema | undefined {
    return getExtension(schema, RapiddocsOpenAPIExtension.ENCODING) ?? undefined;
}
