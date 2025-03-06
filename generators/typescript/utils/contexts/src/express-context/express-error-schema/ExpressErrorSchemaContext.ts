import { Reference, Zurg } from "@rapiddocs-typescript/commons";

import { DeclaredErrorName } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedExpressErrorSchema } from "./GeneratedExpressErrorSchema";

export interface ExpressErrorSchemaContext {
    getGeneratedExpressErrorSchema: (errorName: DeclaredErrorName) => GeneratedExpressErrorSchema | undefined;
    getSchemaOfError: (errorName: DeclaredErrorName) => Zurg.Schema;
    getReferenceToExpressErrorSchema: (errorName: DeclaredErrorName) => Reference;
}
