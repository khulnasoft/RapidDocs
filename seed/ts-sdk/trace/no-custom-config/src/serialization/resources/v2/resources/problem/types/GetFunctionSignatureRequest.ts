/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedTrace from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { FunctionSignature } from "./FunctionSignature";

export const GetFunctionSignatureRequest: core.serialization.ObjectSchema<
    serializers.v2.GetFunctionSignatureRequest.Raw,
    SeedTrace.v2.GetFunctionSignatureRequest
> = core.serialization.object({
    functionSignature: FunctionSignature,
});

export declare namespace GetFunctionSignatureRequest {
    export interface Raw {
        functionSignature: FunctionSignature.Raw;
    }
}
