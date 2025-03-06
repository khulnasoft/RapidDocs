import { PackageId } from "@rapiddocs-typescript/commons";
import { GeneratedSdkInlinedRequestBodySchema } from "@rapiddocs-typescript/contexts";

import { HttpEndpoint } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedSdkInlinedRequestBodySchemaImpl } from "./GeneratedSdkInlinedRequestBodySchemaImpl";

export declare namespace SdkInlinedRequestBodySchemaGenerator {
    export interface Init {
        includeSerdeLayer: boolean;
        allowExtraFields: boolean;
        omitUndefined: boolean;
    }

    export namespace generateInlinedRequestBodySchema {
        export interface Args {
            packageId: PackageId;
            endpoint: HttpEndpoint;
            typeName: string;
        }
    }
}

export class SdkInlinedRequestBodySchemaGenerator {
    private includeSerdeLayer: boolean;
    private allowExtraFields: boolean;
    private omitUndefined: boolean;

    constructor({ includeSerdeLayer, allowExtraFields, omitUndefined }: SdkInlinedRequestBodySchemaGenerator.Init) {
        this.includeSerdeLayer = includeSerdeLayer;
        this.allowExtraFields = allowExtraFields;
        this.omitUndefined = omitUndefined;
    }

    public generateInlinedRequestBodySchema({
        packageId,
        endpoint,
        typeName
    }: SdkInlinedRequestBodySchemaGenerator.generateInlinedRequestBodySchema.Args): GeneratedSdkInlinedRequestBodySchema {
        if (endpoint.requestBody?.type !== "inlinedRequestBody") {
            throw new Error("Request is not inlined");
        }
        return new GeneratedSdkInlinedRequestBodySchemaImpl({
            packageId,
            endpoint,
            inlinedRequestBody: endpoint.requestBody,
            typeName,
            includeSerdeLayer: this.includeSerdeLayer,
            allowExtraFields: this.allowExtraFields ?? endpoint.requestBody.extraProperties,
            omitUndefined: this.omitUndefined
        });
    }
}
