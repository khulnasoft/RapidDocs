/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";

export const OpenApiSourceSchema: core.serialization.ObjectSchema<
    serializers.OpenApiSourceSchema.Raw,
    RapiddocsDefinition.OpenApiSourceSchema
> = core.serialization.object({
    openapi: core.serialization.string(),
});

export declare namespace OpenApiSourceSchema {
    export interface Raw {
        openapi: string;
    }
}
