import { PackageId, Reference } from "@rapiddocs-typescript/commons";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedEndpointErrorUnion } from "./GeneratedEndpointErrorUnion";

export interface EndpointErrorUnionContext {
    getGeneratedEndpointErrorUnion: (packageId: PackageId, endpointName: Name) => GeneratedEndpointErrorUnion;
    getReferenceToEndpointTypeExport: (
        packageId: PackageId,
        endpointName: Name,
        export_: string | string[]
    ) => Reference;
}
