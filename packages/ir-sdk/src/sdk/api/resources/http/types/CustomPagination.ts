/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../index";

/**
 * Pagination where the SDK author is responsible for implementing the pagination
 * logic in the SDK.
 */
export interface CustomPagination {
    /**
     * The response property is used to determine the results response type
     * generated in the endpoint.
     */
    results: RapiddocsIr.ResponseProperty;
}
