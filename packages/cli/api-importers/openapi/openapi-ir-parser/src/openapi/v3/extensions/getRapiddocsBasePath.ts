import { OpenAPIV3 } from "openapi-types";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export function getRapiddocsBasePath(parameter: OpenAPIV3.Document): string | undefined {
    return getExtension<string>(parameter, RapiddocsOpenAPIExtension.BASE_PATH);
}
