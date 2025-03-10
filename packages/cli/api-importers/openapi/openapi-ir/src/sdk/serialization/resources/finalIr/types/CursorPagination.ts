/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";

export const CursorPagination: core.serialization.ObjectSchema<
    serializers.CursorPagination.Raw,
    RapiddocsOpenapiIr.CursorPagination
> = core.serialization.objectWithoutOptionalProperties({
    cursor: core.serialization.string(),
    nextCursor: core.serialization.property("next_cursor", core.serialization.string()),
    results: core.serialization.string(),
});

export declare namespace CursorPagination {
    export interface Raw {
        cursor: string;
        next_cursor: string;
        results: string;
    }
}
