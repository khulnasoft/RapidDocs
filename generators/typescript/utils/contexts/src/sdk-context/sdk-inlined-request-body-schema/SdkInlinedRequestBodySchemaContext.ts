import { PackageId, Reference } from "@rapiddocs-typescript/commons";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedSdkInlinedRequestBodySchema } from "./GeneratedSdkInlinedRequestBodySchema";

export interface SdkInlinedRequestBodySchemaContext {
    getGeneratedInlinedRequestBodySchema: (
        packageId: PackageId,
        endpointName: Name
    ) => GeneratedSdkInlinedRequestBodySchema;
    getReferenceToInlinedRequestBody: (packageId: PackageId, endpointName: Name) => Reference;
}
