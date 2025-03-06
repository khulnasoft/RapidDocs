import { OpenAPIV3 } from "openapi-types";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export interface CasingConfig {
    snake?: string;
    camel?: string;
    screamingSnake?: string;
    pascal?: string;
}

export type RapiddocsEnumConfig = Record<string, { description?: string; name?: string; casing?: CasingConfig }>;

export function getRapiddocsEnum(schema: OpenAPIV3.SchemaObject): RapiddocsEnumConfig | undefined {
    return getExtension<RapiddocsEnumConfig>(schema, RapiddocsOpenAPIExtension.RAPIDDOCS_ENUM);
}
