import { assertNever } from "@khulnasoft/core-utils";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Source } from "@khulnasoft/openapi-ir";

export function convertToSourceSchema(source: Source): RawSchemas.SourceSchema {
    switch (source.type) {
        case "openapi":
            return {
                openapi: source.file
            };
        case "protobuf":
            return {
                proto: source.file
            };
        default:
            assertNever(source);
    }
}
