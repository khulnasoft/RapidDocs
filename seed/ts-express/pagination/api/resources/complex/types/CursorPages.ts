/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedPagination from "../../../index";

export interface CursorPages {
    next?: SeedPagination.StartingAfterPaging;
    page?: number;
    perPage?: number;
    totalPages?: number;
    type: "pages";
}
