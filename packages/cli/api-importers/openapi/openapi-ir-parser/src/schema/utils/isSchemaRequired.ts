import { Schema } from "@khulnasoft/openapi-ir";

export function isSchemaRequired(schema: Schema): boolean {
    return schema.type !== "optional" && schema.type !== "nullable";
}
