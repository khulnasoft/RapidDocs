/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedUnions from "../../../../api/index";
import * as core from "../../../../core";

export const VibrantExcitement: core.serialization.ObjectSchema<
    serializers.VibrantExcitement.Raw,
    SeedUnions.VibrantExcitement
> = core.serialization.object({
    value: core.serialization.string(),
});

export declare namespace VibrantExcitement {
    export interface Raw {
        value: string;
    }
}
