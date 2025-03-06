import { NpmPackage, PackageId, Reference } from "@rapiddocs-typescript/commons";

import { GeneratedSdkClientClass } from "./GeneratedSdkClientClass";

export interface SdkClientClassContext {
    getGeneratedSdkClientClass: (packageId: PackageId) => GeneratedSdkClientClass;
    getReferenceToClientClass: (
        packageId: PackageId,
        options?: { importAlias?: string; npmPackage?: NpmPackage }
    ) => Reference;
}
