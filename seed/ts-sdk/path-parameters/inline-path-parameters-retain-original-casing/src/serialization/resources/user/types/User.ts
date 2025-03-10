/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedPathParameters from "../../../../api/index";
import * as core from "../../../../core";

export const User: core.serialization.ObjectSchema<serializers.User.Raw, SeedPathParameters.User> =
    core.serialization.object({
        name: core.serialization.string(),
        tags: core.serialization.list(core.serialization.string()),
    });

export declare namespace User {
    export interface Raw {
        name: string;
        tags: string[];
    }
}
