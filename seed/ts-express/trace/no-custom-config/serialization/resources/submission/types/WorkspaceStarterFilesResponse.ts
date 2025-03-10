/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const WorkspaceStarterFilesResponse: core.serialization.ObjectSchema<
    serializers.WorkspaceStarterFilesResponse.Raw,
    SeedTrace.WorkspaceStarterFilesResponse
> = core.serialization.object({
    files: core.serialization.record(
        core.serialization.lazy(() => serializers.Language),
        core.serialization.lazyObject(() => serializers.WorkspaceFiles).optional(),
    ),
});

export declare namespace WorkspaceStarterFilesResponse {
    export interface Raw {
        files: Record<serializers.Language.Raw, serializers.WorkspaceFiles.Raw | null | undefined>;
    }
}
