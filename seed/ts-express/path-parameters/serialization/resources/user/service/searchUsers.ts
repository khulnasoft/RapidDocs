/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedPathParameters from "../../../../api/index";
import * as core from "../../../../core";

export const Response: core.serialization.Schema<serializers.user.searchUsers.Response.Raw, SeedPathParameters.User[]> =
    core.serialization.list(core.serialization.lazyObject(() => serializers.User));

export declare namespace Response {
    export type Raw = serializers.User.Raw[];
}
