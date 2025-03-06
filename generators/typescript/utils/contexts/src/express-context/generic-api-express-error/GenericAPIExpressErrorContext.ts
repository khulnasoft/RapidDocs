import { Reference } from "@rapiddocs-typescript/commons";

import { GeneratedGenericAPIExpressError } from "./GeneratedGenericAPIExpressError";

export interface GenericAPIExpressErrorContext {
    getReferenceToGenericAPIExpressError: () => Reference;
    getGeneratedGenericAPIExpressError: () => GeneratedGenericAPIExpressError;
}
