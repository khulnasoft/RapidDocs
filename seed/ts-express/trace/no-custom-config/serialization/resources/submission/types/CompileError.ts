/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const CompileError: core.serialization.ObjectSchema<serializers.CompileError.Raw, SeedTrace.CompileError> =
    core.serialization.object({
        message: core.serialization.string(),
    });

export declare namespace CompileError {
    export interface Raw {
        message: string;
    }
}
