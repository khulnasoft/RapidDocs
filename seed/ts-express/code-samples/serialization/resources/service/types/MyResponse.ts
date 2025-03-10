/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedCodeSamples from "../../../../api/index";
import * as core from "../../../../core";

export const MyResponse: core.serialization.ObjectSchema<serializers.MyResponse.Raw, SeedCodeSamples.MyResponse> =
    core.serialization.object({
        id: core.serialization.string(),
        name: core.serialization.string().optional(),
    });

export declare namespace MyResponse {
    interface Raw {
        id: string;
        name?: string | null;
    }
}
