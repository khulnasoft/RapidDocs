import { OpenAPIV3 } from "openapi-types";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export interface AsyncRapiddocsExtensionSchema {
    discriminant: {
        name: string;
        value: string;
    };
    "response-status-code": number;
}

export function getRapiddocsAsyncExtension(operation: OpenAPIV3.OperationObject): AsyncRapiddocsExtensionSchema | undefined {
    return getExtension<AsyncRapiddocsExtensionSchema>(operation, RapiddocsOpenAPIExtension.ASYNC_CONFIG);
}
