/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";

export const DoubleValidationRules: core.serialization.ObjectSchema<
    serializers.DoubleValidationRules.Raw,
    RapiddocsIr.DoubleValidationRules
> = core.serialization.objectWithoutOptionalProperties({
    min: core.serialization.number().optional(),
    max: core.serialization.number().optional(),
    exclusiveMin: core.serialization.boolean().optional(),
    exclusiveMax: core.serialization.boolean().optional(),
    multipleOf: core.serialization.number().optional(),
});

export declare namespace DoubleValidationRules {
    export interface Raw {
        min?: number | null;
        max?: number | null;
        exclusiveMin?: boolean | null;
        exclusiveMax?: boolean | null;
        multipleOf?: number | null;
    }
}
