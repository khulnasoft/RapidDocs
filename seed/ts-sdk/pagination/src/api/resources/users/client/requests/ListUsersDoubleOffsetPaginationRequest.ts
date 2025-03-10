/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedPagination from "../../../../index";

/**
 * @example
 *     {
 *         page: 1.1,
 *         perPage: 1.1,
 *         order: "asc",
 *         startingAfter: "starting_after"
 *     }
 */
export interface ListUsersDoubleOffsetPaginationRequest {
    /**
     * Defaults to first page
     */
    page?: number;
    /**
     * Defaults to per page
     */
    perPage?: number;
    order?: SeedPagination.Order;
    /**
     * The cursor used for pagination in order to fetch
     * the next page of results.
     */
    startingAfter?: string;
}
