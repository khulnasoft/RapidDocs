/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";

export const FloatWithExample: core.serialization.ObjectSchema<
    serializers.FloatWithExample.Raw,
    RapiddocsOpenapiIr.FloatWithExample
> = core.serialization.objectWithoutOptionalProperties({
    example: core.serialization.number().optional(),
});

export declare namespace FloatWithExample {
    export interface Raw {
        example?: number | null;
    }
}
