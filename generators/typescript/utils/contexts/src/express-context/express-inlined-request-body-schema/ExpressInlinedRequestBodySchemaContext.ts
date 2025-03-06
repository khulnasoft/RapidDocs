import { PackageId, Reference } from "@rapiddocs-typescript/commons";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedExpressInlinedRequestBodySchema } from "./GeneratedExpressInlinedRequestBodySchema";

export interface ExpressInlinedRequestBodySchemaContext {
    getGeneratedInlinedRequestBodySchema: (
        packageId: PackageId,
        endpointName: Name
    ) => GeneratedExpressInlinedRequestBodySchema;
    getReferenceToInlinedRequestBody: (packageId: PackageId, endpointName: Name) => Reference;
}
