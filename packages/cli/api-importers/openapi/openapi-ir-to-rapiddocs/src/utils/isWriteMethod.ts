import { RapiddocsOpenapiIr } from "@khulnasoft/openapi-ir";

export function isWriteMethod(method: RapiddocsOpenapiIr.HttpMethod): boolean | undefined {
    return method === "POST" || method === "PUT" || method === "PATCH";
}
