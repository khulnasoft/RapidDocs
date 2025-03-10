/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const NpmRegistryConfig: core.serialization.ObjectSchema<
    serializers.generatorExec.NpmRegistryConfig.Raw,
    RapiddocsIr.generatorExec.NpmRegistryConfig
> = core.serialization.objectWithoutOptionalProperties({
    registryUrl: core.serialization.string(),
    token: core.serialization.string(),
    scope: core.serialization.string(),
});

export declare namespace NpmRegistryConfig {
    export interface Raw {
        registryUrl: string;
        token: string;
        scope: string;
    }
}
