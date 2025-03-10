/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDocsConfig from "../../../../api/index";
import * as core from "../../../../core";

export const RedirectConfig: core.serialization.ObjectSchema<
    serializers.RedirectConfig.Raw,
    RapiddocsDocsConfig.RedirectConfig
> = core.serialization.object({
    source: core.serialization.string(),
    destination: core.serialization.string(),
    permanent: core.serialization.boolean().optional(),
});

export declare namespace RedirectConfig {
    export interface Raw {
        source: string;
        destination: string;
        permanent?: boolean | null;
    }
}
