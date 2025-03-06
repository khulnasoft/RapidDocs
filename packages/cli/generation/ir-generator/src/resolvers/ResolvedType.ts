import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { DeclaredTypeName, Literal as IrLiteral, PrimitiveType, TypeReference } from "@khulnasoft/ir-sdk";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { RapiddocsFileContext } from "../RapiddocsFileContext";

export declare type ResolvedType =
    | ResolvedType.Container
    | ResolvedType.Named
    | ResolvedType.Primitive
    | ResolvedType.Unknown;

export declare namespace ResolvedType {
    interface Container {
        _type: "container";
        container: ResolvedContainerType;
        originalTypeReference: TypeReference.Container;
    }

    interface Named {
        _type: "named";
        rawName: string;
        name: DeclaredTypeName;
        declaration:
            | RawSchemas.ObjectSchema
            | RawSchemas.DiscriminatedUnionSchema
            | RawSchemas.UndiscriminatedUnionSchema
            | RawSchemas.EnumSchema;
        filepath: RelativeFilePath;
        file: RapiddocsFileContext;
        // this is the breadcrumbs path to the final declaration, including intermediate aliases
        objectPath: ObjectPathItem[];
        originalTypeReference: TypeReference.Named;
    }

    interface Primitive {
        _type: "primitive";
        primitive: PrimitiveType;
        originalTypeReference: TypeReference.Primitive;
    }

    interface Unknown {
        _type: "unknown";
        originalTypeReference: TypeReference.Unknown;
    }
}

export declare type ResolvedContainerType =
    | ResolvedContainerType.Map
    | ResolvedContainerType.List
    | ResolvedContainerType.Optional
    | ResolvedContainerType.Nullable
    | ResolvedContainerType.Set
    | ResolvedContainerType.Literal;

export declare namespace ResolvedContainerType {
    interface Map {
        _type: "map";
        keyType: ResolvedType;
        valueType: ResolvedType;
    }

    interface List {
        _type: "list";
        itemType: ResolvedType;
    }

    interface Optional {
        _type: "optional";
        itemType: ResolvedType;
    }

    interface Nullable {
        _type: "nullable";
        itemType: ResolvedType;
    }

    interface Set {
        _type: "set";
        itemType: ResolvedType;
    }

    interface Literal {
        _type: "literal";
        literal: IrLiteral;
    }
}

export interface ObjectPathItem {
    file: RelativeFilePath;
    typeName: string;
    // the original reference in the source file, could be `typeName` or `importedFile.typeName`
    reference: string;
}
