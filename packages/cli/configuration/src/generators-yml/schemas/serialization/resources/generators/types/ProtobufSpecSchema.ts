/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { ProtobufDefinitionSchema } from "./ProtobufDefinitionSchema";

export const ProtobufSpecSchema: core.serialization.ObjectSchema<
    serializers.ProtobufSpecSchema.Raw,
    RapiddocsDefinition.ProtobufSpecSchema
> = core.serialization.object({
    proto: ProtobufDefinitionSchema,
});

export declare namespace ProtobufSpecSchema {
    export interface Raw {
        proto: ProtobufDefinitionSchema.Raw;
    }
}
