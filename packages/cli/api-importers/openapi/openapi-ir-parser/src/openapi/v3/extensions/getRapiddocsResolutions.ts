import { OpenAPIV3 } from "openapi-types";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export interface RapiddocsResolutionSchema {
    name: string;
    resolutions: string[];
}

export function getRapiddocsResolutions(openapi: OpenAPIV3.Document): RapiddocsResolutionSchema[] | undefined {
    return getExtension<RapiddocsResolutionSchema[]>(openapi, RapiddocsOpenAPIExtension.RESOLUTIONS);
}
