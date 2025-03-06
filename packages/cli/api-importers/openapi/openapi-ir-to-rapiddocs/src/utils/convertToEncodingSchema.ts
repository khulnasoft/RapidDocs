import { assertNever } from "@khulnasoft/core-utils";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Encoding } from "@khulnasoft/openapi-ir";

export function convertToEncodingSchema(encoding: Encoding): RawSchemas.EncodingSchema {
    switch (encoding.type) {
        case "protobuf":
            return {
                proto: {
                    type: encoding.typeName
                }
            };
        default:
            assertNever(encoding.type);
    }
}
