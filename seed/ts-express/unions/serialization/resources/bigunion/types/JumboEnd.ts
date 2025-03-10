/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedUnions from "../../../../api/index";
import * as core from "../../../../core";

export const JumboEnd: core.serialization.ObjectSchema<serializers.JumboEnd.Raw, SeedUnions.JumboEnd> =
    core.serialization.object({
        value: core.serialization.string(),
    });

export declare namespace JumboEnd {
    export interface Raw {
        value: string;
    }
}
