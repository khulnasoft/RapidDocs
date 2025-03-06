import { ImportsManager, PackageId, Reference } from "@rapiddocs-typescript/commons";
import {
    ExpressInlinedRequestBodySchemaContext,
    GeneratedExpressInlinedRequestBodySchema
} from "@rapiddocs-typescript/contexts";
import { ExpressInlinedRequestBodySchemaGenerator } from "@rapiddocs-typescript/express-inlined-request-schema-generator";
import { PackageResolver } from "@rapiddocs-typescript/resolvers";
import { SourceFile } from "ts-morph";

import { Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { ExpressInlinedRequestBodyDeclarationReferencer } from "../../declaration-referencers/ExpressInlinedRequestBodyDeclarationReferencer";
import { getSchemaImportStrategy } from "../getSchemaImportStrategy";

export declare namespace ExpressInlinedRequestBodySchemaContextImpl {
    export interface Init {
        expressInlinedRequestBodySchemaGenerator: ExpressInlinedRequestBodySchemaGenerator;
        expressInlinedRequestBodySchemaDeclarationReferencer: ExpressInlinedRequestBodyDeclarationReferencer;
        packageResolver: PackageResolver;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
    }
}

export class ExpressInlinedRequestBodySchemaContextImpl implements ExpressInlinedRequestBodySchemaContext {
    private expressInlinedRequestBodySchemaGenerator: ExpressInlinedRequestBodySchemaGenerator;
    private expressInlinedRequestBodySchemaDeclarationReferencer: ExpressInlinedRequestBodyDeclarationReferencer;
    private packageResolver: PackageResolver;
    private sourceFile: SourceFile;
    private importsManager: ImportsManager;

    constructor({
        importsManager,
        packageResolver,
        sourceFile,
        expressInlinedRequestBodySchemaDeclarationReferencer,
        expressInlinedRequestBodySchemaGenerator
    }: ExpressInlinedRequestBodySchemaContextImpl.Init) {
        this.expressInlinedRequestBodySchemaGenerator = expressInlinedRequestBodySchemaGenerator;
        this.expressInlinedRequestBodySchemaDeclarationReferencer =
            expressInlinedRequestBodySchemaDeclarationReferencer;
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.packageResolver = packageResolver;
    }

    public getGeneratedInlinedRequestBodySchema(
        packageId: PackageId,
        endpointName: Name
    ): GeneratedExpressInlinedRequestBodySchema {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.expressInlinedRequestBodySchemaGenerator.generateInlinedRequestBodySchema({
            packageId,
            endpoint,
            typeName: this.expressInlinedRequestBodySchemaDeclarationReferencer.getExportedName({
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
        return this.expressInlinedRequestBodySchemaDeclarationReferencer.getReferenceToInlinedRequestBody({
            name: { packageId, endpoint },
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
            importStrategy: getSchemaImportStrategy({ useDynamicImport: false })
        });
    }
}
