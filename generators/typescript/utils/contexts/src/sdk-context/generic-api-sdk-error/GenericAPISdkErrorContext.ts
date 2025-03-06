import { Reference } from "@rapiddocs-typescript/commons";

import { GeneratedGenericAPISdkError } from "./GeneratedGenericAPISdkError";

export interface GenericAPISdkErrorContext {
    getReferenceToGenericAPISdkError: () => Reference;
    getGeneratedGenericAPISdkError: () => GeneratedGenericAPISdkError;
}
