import { RapiddocsOpenapiIr } from "@khulnasoft/openapi-ir";

export function shouldSkipReadOnly(method: RapiddocsOpenapiIr.HttpMethod): boolean | undefined {
    return method === "POST" || method === "PUT" || method === "PATCH";
}
