import { PackageId, Reference } from "@rapiddocs-typescript/commons";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedExpressEndpointTypeSchemas } from "./GeneratedExpressEndpointTypeSchemas";

export interface ExpressEndpointTypeSchemasContext {
    getGeneratedEndpointTypeSchemas: (packageId: PackageId, endpointName: Name) => GeneratedExpressEndpointTypeSchemas;
    getReferenceToEndpointTypeSchemaExport: (
        packageId: PackageId,
        endpointName: Name,
        export_: string | string[]
    ) => Reference;
}
