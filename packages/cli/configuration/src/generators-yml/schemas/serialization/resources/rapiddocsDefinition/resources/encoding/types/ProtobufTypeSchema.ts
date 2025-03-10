/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsDefinition from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const ProtobufTypeSchema: core.serialization.ObjectSchema<
    serializers.rapiddocsDefinition.ProtobufTypeSchema.Raw,
    RapiddocsDefinition.rapiddocsDefinition.ProtobufTypeSchema
> = core.serialization.object({
    type: core.serialization.string(),
});

export declare namespace ProtobufTypeSchema {
    export interface Raw {
        type: string;
    }
}
