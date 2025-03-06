import { assertNever } from "@khulnasoft/core-utils";

import { RapiddocsIr } from "@rapiddocs-rapiddocs/ir-sdk";

export function convertExampleTypeReferenceToTypeReference(
    exampleTypeReference: RapiddocsIr.ExampleTypeReference
): RapiddocsIr.TypeReference {
    switch (exampleTypeReference.shape.type) {
        case "named":
            return convertExampleNamedTypeToTypeReference(exampleTypeReference.shape);
        case "primitive":
            return convertExamplePrimitiveTypeToTypeReference(exampleTypeReference.shape);
        case "container":
            return convertExampleContainerTypeToTypeReference(exampleTypeReference.shape);
        case "unknown":
            return RapiddocsIr.TypeReference.unknown();
        default:
            assertNever(exampleTypeReference.shape);
    }
}

function convertExampleNamedTypeToTypeReference(
    exampleNamedType: RapiddocsIr.ExampleTypeReferenceShape.Named
): RapiddocsIr.TypeReference.Named {
    return RapiddocsIr.TypeReference.named({
        name: exampleNamedType.typeName.name,
        inline: false,
        default: undefined,
        rapiddocsFilepath: exampleNamedType.typeName.rapiddocsFilepath,
        typeId: exampleNamedType.typeName.typeId
    });
}

function convertExampleContainerTypeToTypeReference(
    exampleContainerType: RapiddocsIr.ExampleTypeReferenceShape.Container
): RapiddocsIr.TypeReference.Container {
    switch (exampleContainerType.container.type) {
        case "list":
            return RapiddocsIr.TypeReference.container(RapiddocsIr.ContainerType.list(exampleContainerType.container.itemType));
        case "set":
            return RapiddocsIr.TypeReference.container(RapiddocsIr.ContainerType.set(exampleContainerType.container.itemType));
        case "optional":
            return RapiddocsIr.TypeReference.container(
                RapiddocsIr.ContainerType.optional(exampleContainerType.container.valueType)
            );
        case "nullable":
            return RapiddocsIr.TypeReference.container(
                RapiddocsIr.ContainerType.nullable(exampleContainerType.container.valueType)
            );
        case "map":
            return RapiddocsIr.TypeReference.container(
                RapiddocsIr.ContainerType.map({
                    keyType: exampleContainerType.container.keyType,
                    valueType: exampleContainerType.container.valueType
                })
            );
        case "literal":
            return RapiddocsIr.TypeReference.container(
                RapiddocsIr.ContainerType.literal(convertExampleLiteralToLiteral(exampleContainerType.container))
            );
        default:
            assertNever(exampleContainerType.container);
    }
}

function convertExampleLiteralToLiteral(literalContainer: RapiddocsIr.ExampleLiteralContainer): RapiddocsIr.Literal {
    switch (literalContainer.literal.type) {
        case "string":
            return RapiddocsIr.Literal.string(literalContainer.literal.string.original);
        case "boolean":
            return RapiddocsIr.Literal.boolean(literalContainer.literal.boolean);
        case "integer":
        case "long":
        case "uint":
        case "uint64":
        case "float":
        case "double":
        case "date":
        case "datetime":
        case "uuid":
        case "base64":
        case "bigInteger":
            throw new Error("Internal error; only boolean and string literals are permitted");
        default:
            assertNever(literalContainer.literal);
    }
}

function convertExamplePrimitiveTypeToTypeReference(
    examplePrimitiveType: RapiddocsIr.ExampleTypeReferenceShape.Primitive
): RapiddocsIr.TypeReference.Primitive {
    return RapiddocsIr.TypeReference.primitive({
        v1: convertExamplePrimitiveToV1Primitive(examplePrimitiveType),
        v2: convertExamplePrimitiveToV2Primitive(examplePrimitiveType)
    });
}

function convertExamplePrimitiveToV1Primitive(
    examplePrimitiveType: RapiddocsIr.ExampleTypeReferenceShape.Primitive
): RapiddocsIr.PrimitiveTypeV1 {
    switch (examplePrimitiveType.primitive.type) {
        case "string":
            return RapiddocsIr.PrimitiveTypeV1.String;
        case "boolean":
            return RapiddocsIr.PrimitiveTypeV1.Boolean;
        case "integer":
            return RapiddocsIr.PrimitiveTypeV1.Integer;
        case "long":
            return RapiddocsIr.PrimitiveTypeV1.Long;
        case "uint":
            return RapiddocsIr.PrimitiveTypeV1.Uint;
        case "uint64":
            return RapiddocsIr.PrimitiveTypeV1.Uint64;
        case "float":
            return RapiddocsIr.PrimitiveTypeV1.Float;
        case "double":
            return RapiddocsIr.PrimitiveTypeV1.Double;
        case "date":
            return RapiddocsIr.PrimitiveTypeV1.Date;
        case "datetime":
            return RapiddocsIr.PrimitiveTypeV1.DateTime;
        case "uuid":
            return RapiddocsIr.PrimitiveTypeV1.Uuid;
        case "base64":
            return RapiddocsIr.PrimitiveTypeV1.Base64;
        case "bigInteger":
            return RapiddocsIr.PrimitiveTypeV1.BigInteger;
        default:
            assertNever(examplePrimitiveType.primitive);
    }
}

function convertExamplePrimitiveToV2Primitive(
    examplePrimitiveType: RapiddocsIr.ExampleTypeReferenceShape.Primitive
): RapiddocsIr.PrimitiveTypeV2 {
    switch (examplePrimitiveType.primitive.type) {
        case "string":
            return RapiddocsIr.PrimitiveTypeV2.string({
                default: undefined,
                validation: undefined
            });
        case "boolean":
            return RapiddocsIr.PrimitiveTypeV2.boolean({
                default: undefined
            });
        case "integer":
            return RapiddocsIr.PrimitiveTypeV2.integer({
                default: undefined,
                validation: undefined
            });
        case "long":
            return RapiddocsIr.PrimitiveTypeV2.long({
                default: undefined
            });
        case "uint":
            return RapiddocsIr.PrimitiveTypeV2.uint({
                default: undefined,
                validation: undefined
            });
        case "uint64":
            return RapiddocsIr.PrimitiveTypeV2.uint64({
                default: undefined,
                validation: undefined
            });
        case "float":
            return RapiddocsIr.PrimitiveTypeV2.float({
                default: undefined,
                validation: undefined
            });
        case "double":
            return RapiddocsIr.PrimitiveTypeV2.double({
                default: undefined,
                validation: undefined
            });
        case "date":
            return RapiddocsIr.PrimitiveTypeV2.date({
                default: undefined,
                validation: undefined
            });
        case "datetime":
            return RapiddocsIr.PrimitiveTypeV2.dateTime({
                default: undefined,
                validation: undefined
            });
        case "uuid":
            return RapiddocsIr.PrimitiveTypeV2.uuid({
                default: undefined,
                validation: undefined
            });
        case "base64":
            return RapiddocsIr.PrimitiveTypeV2.base64({
                default: undefined,
                validation: undefined
            });
        case "bigInteger":
            return RapiddocsIr.PrimitiveTypeV2.bigInteger({
                default: undefined
            });
        default:
            assertNever(examplePrimitiveType.primitive);
    }
}
