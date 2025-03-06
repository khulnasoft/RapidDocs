import { ImportsManager, PackageId, Reference } from "@rapiddocs-typescript/commons";
import { GeneratedSdkInlinedRequestBodySchema, SdkInlinedRequestBodySchemaContext } from "@rapiddocs-typescript/contexts";
import { PackageResolver } from "@rapiddocs-typescript/resolvers";
import { SdkInlinedRequestBodySchemaGenerator } from "@rapiddocs-typescript/sdk-inlined-request-schema-generator";
import { SourceFile } from "ts-morph";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { SdkInlinedRequestBodyDeclarationReferencer } from "../../declaration-referencers/SdkInlinedRequestBodyDeclarationReferencer";
import { getSchemaImportStrategy } from "../getSchemaImportStrategy";

export declare namespace SdkInlinedRequestBodySchemaContextImpl {
    export interface Init {
        sdkInlinedRequestBodySchemaGenerator: SdkInlinedRequestBodySchemaGenerator;
        sdkInlinedRequestBodySchemaDeclarationReferencer: SdkInlinedRequestBodyDeclarationReferencer;
        packageResolver: PackageResolver;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
    }
}

export class SdkInlinedRequestBodySchemaContextImpl implements SdkInlinedRequestBodySchemaContext {
    private sdkInlinedRequestBodySchemaGenerator: SdkInlinedRequestBodySchemaGenerator;
    private sdkInlinedRequestBodySchemaDeclarationReferencer: SdkInlinedRequestBodyDeclarationReferencer;
    private packageResolver: PackageResolver;
    private sourceFile: SourceFile;
    private importsManager: ImportsManager;

    constructor({
        importsManager,
        packageResolver,
        sourceFile,
        sdkInlinedRequestBodySchemaDeclarationReferencer,
        sdkInlinedRequestBodySchemaGenerator
    }: SdkInlinedRequestBodySchemaContextImpl.Init) {
        this.sdkInlinedRequestBodySchemaGenerator = sdkInlinedRequestBodySchemaGenerator;
        this.sdkInlinedRequestBodySchemaDeclarationReferencer = sdkInlinedRequestBodySchemaDeclarationReferencer;
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.packageResolver = packageResolver;
    }

    public getGeneratedInlinedRequestBodySchema(
        packageId: PackageId,
        endpointName: Name
    ): GeneratedSdkInlinedRequestBodySchema {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.sdkInlinedRequestBodySchemaGenerator.generateInlinedRequestBodySchema({
            packageId,
            endpoint,
            typeName: this.sdkInlinedRequestBodySchemaDeclarationReferencer.getExportedName({
                packageId,
                endpoint
            })
        });
    }

    public getReferenceToInlinedRequestBody(packageId: PackageId, endpointName: Name): Reference {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.sdkInlinedRequestBodySchemaDeclarationReferencer.getReferenceToInlinedRequestBody({
            name: { packageId, endpoint },
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
            importStrategy: getSchemaImportStrategy({ useDynamicImport: false })
        });
    }
}
