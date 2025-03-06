import { Reference, TypeReferenceNode, Zurg } from "@rapiddocs-typescript/commons";

import { DeclaredTypeName, TypeReference } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedTypeSchema } from "./GeneratedTypeSchema";

export interface TypeSchemaContext {
    getGeneratedTypeSchema: (typeName: DeclaredTypeName) => GeneratedTypeSchema;
    getReferenceToRawType: (typeReference: TypeReference) => TypeReferenceNode;
    getReferenceToRawNamedType: (typeName: DeclaredTypeName) => Reference;
    getSchemaOfTypeReference: (typeReference: TypeReference) => Zurg.Schema;
    getSchemaOfNamedType: (typeName: DeclaredTypeName, opts: { isGeneratingSchema: boolean }) => Zurg.Schema;
}
