/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../index";
import * as SeedExtends from "../../../api/index";
import * as core from "../../../core";

export const Inlined: core.serialization.Schema<serializers.Inlined.Raw, SeedExtends.Inlined> = core.serialization
    .object({
        unique: core.serialization.string(),
    })
    .extend(core.serialization.lazyObject(() => serializers.ExampleType));

export declare namespace Inlined {
    export interface Raw extends serializers.ExampleType.Raw {
        unique: string;
    }
}
