import { PackageId, Reference } from "@rapiddocs-typescript/commons";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedSdkEndpointTypeSchemas } from "./GeneratedSdkEndpointTypeSchemas";

export interface SdkEndpointTypeSchemasContext {
    getGeneratedEndpointTypeSchemas: (packageId: PackageId, endpointName: Name) => GeneratedSdkEndpointTypeSchemas;
    getReferenceToEndpointTypeSchemaExport: (
        packageId: PackageId,
        endpointName: Name,
        export_: string | string[]
    ) => Reference;
}
