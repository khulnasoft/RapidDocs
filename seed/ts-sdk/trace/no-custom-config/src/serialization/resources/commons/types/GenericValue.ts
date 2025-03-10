/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const GenericValue: core.serialization.ObjectSchema<serializers.GenericValue.Raw, SeedTrace.GenericValue> =
    core.serialization.object({
        stringifiedType: core.serialization.string().optional(),
        stringifiedValue: core.serialization.string(),
    });

export declare namespace GenericValue {
    export interface Raw {
        stringifiedType?: string | null;
        stringifiedValue: string;
    }
}
