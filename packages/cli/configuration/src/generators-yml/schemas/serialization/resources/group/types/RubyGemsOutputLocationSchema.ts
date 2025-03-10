/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";

export const RubyGemsOutputLocationSchema: core.serialization.ObjectSchema<
    serializers.RubyGemsOutputLocationSchema.Raw,
    RapiddocsDefinition.RubyGemsOutputLocationSchema
> = core.serialization.object({
    url: core.serialization.string().optional(),
    "package-name": core.serialization.string(),
    "api-key": core.serialization.string().optional(),
});

export declare namespace RubyGemsOutputLocationSchema {
    export interface Raw {
        url?: string | null;
        "package-name": string;
        "api-key"?: string | null;
    }
}
