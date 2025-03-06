import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { HttpMethod } from "@khulnasoft/openapi-ir";

export function convertToHttpMethod(httpMethod: HttpMethod): RawSchemas.HttpMethodSchema {
    return HttpMethod._visit<RawSchemas.HttpMethodSchema>(httpMethod, {
        get: () => RawSchemas.HttpMethodSchema.Get,
        post: () => RawSchemas.HttpMethodSchema.Post,
        put: () => RawSchemas.HttpMethodSchema.Put,
        patch: () => RawSchemas.HttpMethodSchema.Patch,
        delete: () => RawSchemas.HttpMethodSchema.Delete,
        head: () => {
            throw new Error("HEAD is unsupported");
        },
        options: () => {
            throw new Error("HEAD is unsupported");
        },
        trace: () => {
            throw new Error("HEAD is unsupported");
        },
        _other: () => {
            throw new Error("Unknown http method is unsupported");
        }
    });
}
