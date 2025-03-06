import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Encoding } from "@khulnasoft/openapi-ir";

export function convertEncoding(encodingSchema: RawSchemas.EncodingSchema): Encoding | undefined {
    if (encodingSchema.proto != null) {
        return Encoding.protobuf({
            typeName: encodingSchema.proto.type
        });
    }
    return undefined;
}
