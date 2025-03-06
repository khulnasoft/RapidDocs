import { OpenAPIV3 } from "openapi-types";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export function getVariableReference(parameter: OpenAPIV3.ParameterObject): string | undefined {
    return getExtension<string>(parameter, RapiddocsOpenAPIExtension.SDK_VARIABLE);
}
