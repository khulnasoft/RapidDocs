/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { RequestProperty } from "./RequestProperty";
import { ResponseProperty } from "./ResponseProperty";

export const CursorPagination: core.serialization.ObjectSchema<
    serializers.CursorPagination.Raw,
    RapiddocsIr.CursorPagination
> = core.serialization.objectWithoutOptionalProperties({
    page: RequestProperty,
    next: ResponseProperty,
    results: ResponseProperty,
});

export declare namespace CursorPagination {
    export interface Raw {
        page: RequestProperty.Raw;
        next: ResponseProperty.Raw;
        results: ResponseProperty.Raw;
    }
}
