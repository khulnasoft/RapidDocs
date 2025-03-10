/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedTrace from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const Response: core.serialization.Schema<
    serializers.v2.problem.getProblems.Response.Raw,
    SeedTrace.v2.ProblemInfoV2[]
> = core.serialization.list(core.serialization.lazyObject(() => serializers.v2.ProblemInfoV2));

export declare namespace Response {
    export type Raw = serializers.v2.ProblemInfoV2.Raw[];
}
