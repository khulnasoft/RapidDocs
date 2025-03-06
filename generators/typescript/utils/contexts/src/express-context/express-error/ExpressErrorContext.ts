import { Reference } from "@rapiddocs-typescript/commons";

import { DeclaredErrorName, ErrorDeclaration } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedExpressError } from "./GeneratedExpressError";

export interface ExpressErrorContext {
    getReferenceToError: (errorName: DeclaredErrorName) => Reference;
    getErrorClassName: (errorName: DeclaredErrorName) => string;
    getGeneratedExpressError: (errorName: DeclaredErrorName) => GeneratedExpressError;
    getErrorDeclaration: (errorName: DeclaredErrorName) => ErrorDeclaration;
}
