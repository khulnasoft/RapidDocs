/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedApi from "../../../../index";

/**
 * @example
 *     {
 *         topK: 1
 *     }
 */
export interface QueryRequest {
    namespace?: string;
    topK: number;
    filter?: SeedApi.Metadata;
    includeValues?: boolean;
    includeMetadata?: boolean;
    queries?: SeedApi.QueryColumn[];
    column?: number[];
    id?: string;
    indexedData?: SeedApi.IndexedData;
}
