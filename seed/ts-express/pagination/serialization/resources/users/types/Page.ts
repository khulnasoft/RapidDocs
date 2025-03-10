/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedPagination from "../../../../api/index";
import * as core from "../../../../core";

export const Page: core.serialization.ObjectSchema<serializers.Page.Raw, SeedPagination.Page> =
    core.serialization.object({
        page: core.serialization.number(),
        next: core.serialization.lazyObject(() => serializers.NextPage).optional(),
        perPage: core.serialization.property("per_page", core.serialization.number()),
        totalPage: core.serialization.property("total_page", core.serialization.number()),
    });

export declare namespace Page {
    export interface Raw {
        page: number;
        next?: serializers.NextPage.Raw | null;
        per_page: number;
        total_page: number;
    }
}
