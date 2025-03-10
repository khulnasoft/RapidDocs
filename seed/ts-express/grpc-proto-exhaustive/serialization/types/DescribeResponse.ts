/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../index";
import * as SeedApi from "../../api/index";
import * as core from "../../core";

export const DescribeResponse: core.serialization.ObjectSchema<
    serializers.DescribeResponse.Raw,
    SeedApi.DescribeResponse
> = core.serialization.object({
    namespaces: core.serialization
        .record(
            core.serialization.string(),
            core.serialization.lazyObject(() => serializers.NamespaceSummary),
        )
        .optional(),
    dimension: core.serialization.number().optional(),
    fullness: core.serialization.number().optional(),
    totalCount: core.serialization.number().optional(),
});

export declare namespace DescribeResponse {
    export interface Raw {
        namespaces?: Record<string, serializers.NamespaceSummary.Raw> | null;
        dimension?: number | null;
        fullness?: number | null;
        totalCount?: number | null;
    }
}
