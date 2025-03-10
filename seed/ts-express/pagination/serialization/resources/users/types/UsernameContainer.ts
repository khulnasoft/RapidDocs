/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedPagination from "../../../../api/index";
import * as core from "../../../../core";

export const UsernameContainer: core.serialization.ObjectSchema<
    serializers.UsernameContainer.Raw,
    SeedPagination.UsernameContainer
> = core.serialization.object({
    results: core.serialization.list(core.serialization.string()),
});

export declare namespace UsernameContainer {
    export interface Raw {
        results: string[];
    }
}
