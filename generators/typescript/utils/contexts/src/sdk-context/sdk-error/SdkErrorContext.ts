import { Reference } from "@rapiddocs-typescript/commons";

import { DeclaredErrorName, ErrorDeclaration } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedSdkError } from "./GeneratedSdkError";

export interface SdkErrorContext {
    getReferenceToError: (errorName: DeclaredErrorName) => Reference;
    getGeneratedSdkError: (errorName: DeclaredErrorName) => GeneratedSdkError | undefined;
    getErrorDeclaration: (errorName: DeclaredErrorName) => ErrorDeclaration;
}
