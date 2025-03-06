import { OpenAPIV3 } from "openapi-types";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export function getParameterName(parameter: OpenAPIV3.ParameterObject): string | undefined {
    return getExtension<string>(parameter, RapiddocsOpenAPIExtension.PARAMETER_NAME);
}
