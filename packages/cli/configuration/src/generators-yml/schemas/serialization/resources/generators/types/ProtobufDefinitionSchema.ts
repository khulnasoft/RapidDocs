/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";

export const ProtobufDefinitionSchema: core.serialization.ObjectSchema<
    serializers.ProtobufDefinitionSchema.Raw,
    RapiddocsDefinition.ProtobufDefinitionSchema
> = core.serialization.object({
    target: core.serialization.string(),
    root: core.serialization.string(),
    overrides: core.serialization.string().optional(),
    "local-generation": core.serialization.boolean().optional(),
});

export declare namespace ProtobufDefinitionSchema {
    export interface Raw {
        target: string;
        root: string;
        overrides?: string | null;
        "local-generation"?: boolean | null;
    }
}
