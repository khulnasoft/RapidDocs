/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";

export const DateWithExample: core.serialization.ObjectSchema<
    serializers.DateWithExample.Raw,
    RapiddocsOpenapiIr.DateWithExample
> = core.serialization.objectWithoutOptionalProperties({
    example: core.serialization.string().optional(),
});

export declare namespace DateWithExample {
    export interface Raw {
        example?: string | null;
    }
}
