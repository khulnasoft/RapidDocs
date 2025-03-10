/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../index";
import * as SeedPagination from "../../../../../api/index";
import * as core from "../../../../../core";

export const ListUsersBodyOffsetPaginationRequest: core.serialization.Schema<
    serializers.ListUsersBodyOffsetPaginationRequest.Raw,
    SeedPagination.ListUsersBodyOffsetPaginationRequest
> = core.serialization.object({
    pagination: core.serialization.lazyObject(() => serializers.WithPage).optional(),
});

export declare namespace ListUsersBodyOffsetPaginationRequest {
    export interface Raw {
        pagination?: serializers.WithPage.Raw | null;
    }
}
