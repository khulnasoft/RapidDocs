import { Reference, Zurg } from "@rapiddocs-typescript/commons";

import { DeclaredErrorName } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedSdkErrorSchema } from "./GeneratedSdkErrorSchema";

export interface SdkErrorSchemaContext {
    getGeneratedSdkErrorSchema: (errorName: DeclaredErrorName) => GeneratedSdkErrorSchema | undefined;
    getSchemaOfError: (errorName: DeclaredErrorName) => Zurg.Schema;
    getReferenceToSdkErrorSchema: (errorName: DeclaredErrorName) => Reference;
}
