/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";

export const BooleanWithExample: core.serialization.ObjectSchema<
    serializers.BooleanWithExample.Raw,
    RapiddocsOpenapiIr.BooleanWithExample
> = core.serialization.objectWithoutOptionalProperties({
    default: core.serialization.boolean().optional(),
    example: core.serialization.boolean().optional(),
});

export declare namespace BooleanWithExample {
    export interface Raw {
        default?: boolean | null;
        example?: boolean | null;
    }
}
