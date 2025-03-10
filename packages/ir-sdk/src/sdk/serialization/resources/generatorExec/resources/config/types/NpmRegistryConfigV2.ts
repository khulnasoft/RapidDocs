/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const NpmRegistryConfigV2: core.serialization.ObjectSchema<
    serializers.generatorExec.NpmRegistryConfigV2.Raw,
    RapiddocsIr.generatorExec.NpmRegistryConfigV2
> = core.serialization.objectWithoutOptionalProperties({
    registryUrl: core.serialization.string(),
    token: core.serialization.string(),
    packageName: core.serialization.string(),
});

export declare namespace NpmRegistryConfigV2 {
    export interface Raw {
        registryUrl: string;
        token: string;
        packageName: string;
    }
}
