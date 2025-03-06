import { OpenAPIV3 } from "openapi-types";

import { GlobalHeader } from "@khulnasoft/openapi-ir";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";
import { getSchemaFromRapiddocsType } from "./getRapiddocsTypeExtension";

interface GlobalHeaderExtension {
    header: string;
    name: string | undefined;
    optional: boolean | undefined;
    env: string | undefined;
    type: string | undefined;
}

export function getGlobalHeaders(document: OpenAPIV3.Document): GlobalHeader[] {
    const globalHeaders = getExtension<GlobalHeaderExtension[]>(document, RapiddocsOpenAPIExtension.RAPIDDOCS_GLOBAL_HEADERS);
    const result: GlobalHeader[] = [];
    for (const header of globalHeaders ?? []) {
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
