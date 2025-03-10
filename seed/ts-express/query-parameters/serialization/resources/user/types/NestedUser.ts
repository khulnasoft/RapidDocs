/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedQueryParameters from "../../../../api/index";
import * as core from "../../../../core";

export const NestedUser: core.serialization.ObjectSchema<serializers.NestedUser.Raw, SeedQueryParameters.NestedUser> =
    core.serialization.object({
        name: core.serialization.string(),
        user: core.serialization.lazyObject(() => serializers.User),
    });

export declare namespace NestedUser {
    export interface Raw {
        name: string;
        user: serializers.User.Raw;
    }
}
