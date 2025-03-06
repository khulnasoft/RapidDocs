import { OpenAPIV3 } from "openapi-types";

import { IdempotencyHeader } from "@khulnasoft/openapi-ir";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";
import { getSchemaFromRapiddocsType } from "./getRapiddocsTypeExtension";

interface IdempotencyHeaderExtension {
    header: string;
    name: string | undefined;
    env: string | undefined;
    type: string | undefined;
}

export function getIdempotencyHeaders(document: OpenAPIV3.Document): IdempotencyHeader[] {
    const idempotencyHeaders = getExtension<IdempotencyHeaderExtension[]>(
        document,
        RapiddocsOpenAPIExtension.RAPIDDOCS_IDEMPOTENCY_HEADERS
    );
    const result: IdempotencyHeader[] = [];
    for (const header of idempotencyHeaders ?? []) {
        result.push({
            ...header,
            schema:
                header.type != null
                    ? getSchemaFromRapiddocsType({
                          rapiddocsType: header.type,
                          description: undefined,
                          availability: undefined,
                          generatedName: header.name ?? header.header,
                          title: undefined,
                          groupName: undefined,
                          nameOverride: undefined
                      })
                    : undefined
        });
    }
    return result;
}
