/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { OpenApiSettingsSchema } from "./OpenApiSettingsSchema";

export const OpenApiSpecSchema: core.serialization.ObjectSchema<
    serializers.OpenApiSpecSchema.Raw,
    RapiddocsDefinition.OpenApiSpecSchema
> = core.serialization.object({
    openapi: core.serialization.string(),
    origin: core.serialization.string().optional(),
    overrides: core.serialization.string().optional(),
    namespace: core.serialization.string().optional(),
    settings: OpenApiSettingsSchema.optional(),
});

export declare namespace OpenApiSpecSchema {
    export interface Raw {
        openapi: string;
        origin?: string | null;
        overrides?: string | null;
        namespace?: string | null;
        settings?: OpenApiSettingsSchema.Raw | null;
    }
}
