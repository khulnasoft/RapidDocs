import { GeneratedExpressInlinedRequestBody } from "@rapiddocs-typescript/contexts";

import { InlinedRequestBody } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedExpressInlinedRequestBodyImpl } from "./GeneratedExpressInlinedRequestBodyImpl";

export declare namespace ExpressInlinedRequestBodyGenerator {
    export namespace generateInlinedRequestBody {
        export interface Args {
            requestBody: InlinedRequestBody;
            typeName: string;
            retainOriginalCasing: boolean;
            includeSerdeLayer: boolean;
        }
    }
}

export class ExpressInlinedRequestBodyGenerator {
    public generateInlinedRequestBody({
        requestBody,
        typeName,
        retainOriginalCasing,
        includeSerdeLayer
    }: ExpressInlinedRequestBodyGenerator.generateInlinedRequestBody.Args): GeneratedExpressInlinedRequestBody {
        return new GeneratedExpressInlinedRequestBodyImpl({
            requestBody,
            typeName,
            retainOriginalCasing,
            includeSerdeLayer
        });
    }
}
