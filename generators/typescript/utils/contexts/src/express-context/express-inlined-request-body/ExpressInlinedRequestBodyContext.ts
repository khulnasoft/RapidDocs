import { PackageId, Reference } from "@rapiddocs-typescript/commons";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedExpressInlinedRequestBody } from "./GeneratedExpressInlinedRequestBody";

export interface ExpressInlinedRequestBodyContext {
    getGeneratedInlinedRequestBody: (packageId: PackageId, endpointName: Name) => GeneratedExpressInlinedRequestBody;
    getReferenceToInlinedRequestBodyType: (packageId: PackageId, endpointName: Name) => Reference;
}
