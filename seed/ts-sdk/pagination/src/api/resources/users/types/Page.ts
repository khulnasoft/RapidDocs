/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedPagination from "../../../index";

export interface Page {
    /** The current page */
    page: number;
    next?: SeedPagination.NextPage;
    perPage: number;
    totalPage: number;
}
