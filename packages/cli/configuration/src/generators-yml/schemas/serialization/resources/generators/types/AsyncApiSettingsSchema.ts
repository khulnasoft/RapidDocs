/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { MessageNamingSettingsSchema } from "./MessageNamingSettingsSchema";
import { BaseApiSettingsSchema } from "./BaseApiSettingsSchema";

export const AsyncApiSettingsSchema: core.serialization.ObjectSchema<
    serializers.AsyncApiSettingsSchema.Raw,
    RapiddocsDefinition.AsyncApiSettingsSchema
> = core.serialization
    .object({
        "message-naming": MessageNamingSettingsSchema.optional(),
    })
    .extend(BaseApiSettingsSchema);

export declare namespace AsyncApiSettingsSchema {
    export interface Raw extends BaseApiSettingsSchema.Raw {
        "message-naming"?: MessageNamingSettingsSchema.Raw | null;
    }
}
