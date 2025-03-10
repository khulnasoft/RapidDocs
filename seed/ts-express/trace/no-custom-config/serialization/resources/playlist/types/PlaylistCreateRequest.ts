/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const PlaylistCreateRequest: core.serialization.ObjectSchema<
    serializers.PlaylistCreateRequest.Raw,
    SeedTrace.PlaylistCreateRequest
> = core.serialization.object({
    name: core.serialization.string(),
    problems: core.serialization.list(core.serialization.lazy(() => serializers.ProblemId)),
});

export declare namespace PlaylistCreateRequest {
    export interface Raw {
        name: string;
        problems: serializers.ProblemId.Raw[];
    }
}
