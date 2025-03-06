import { OpenAPIV3 } from "openapi-types";

import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

import { getExtension, getExtensionAndValidate } from "../../../getExtension";
import { OpenAPIV3ParserContext } from "../OpenAPIV3ParserContext";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export function getRapiddocsVersion({
    context,
    document
}: {
    context: OpenAPIV3ParserContext;
    document: OpenAPIV3.Document;
}): RawSchemas.VersionDeclarationSchema | undefined {
    return getExtension(document, RapiddocsOpenAPIExtension.RAPIDDOCS_VERSION) ?? undefined;
}
