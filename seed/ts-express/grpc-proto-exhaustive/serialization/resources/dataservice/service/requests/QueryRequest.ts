/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../index";
import * as SeedApi from "../../../../../api/index";
import * as core from "../../../../../core";

export const QueryRequest: core.serialization.Schema<serializers.QueryRequest.Raw, SeedApi.QueryRequest> =
    core.serialization.object({
        namespace: core.serialization.string().optional(),
        topK: core.serialization.number(),
        filter: core.serialization.lazy(() => serializers.Metadata).optional(),
        includeValues: core.serialization.boolean().optional(),
        includeMetadata: core.serialization.boolean().optional(),
        queries: core.serialization.list(core.serialization.lazyObject(() => serializers.QueryColumn)).optional(),
        column: core.serialization.list(core.serialization.number()).optional(),
        id: core.serialization.string().optional(),
        indexedData: core.serialization.lazyObject(() => serializers.IndexedData).optional(),
    });

export declare namespace QueryRequest {
    export interface Raw {
        namespace?: string | null;
        topK: number;
        filter?: serializers.Metadata.Raw | null;
        includeValues?: boolean | null;
        includeMetadata?: boolean | null;
        queries?: serializers.QueryColumn.Raw[] | null;
        column?: number[] | null;
        id?: string | null;
        indexedData?: serializers.IndexedData.Raw | null;
    }
}
