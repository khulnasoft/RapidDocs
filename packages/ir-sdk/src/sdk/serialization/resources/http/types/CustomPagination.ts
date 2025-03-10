/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { ResponseProperty } from "./ResponseProperty";

export const CustomPagination: core.serialization.ObjectSchema<
    serializers.CustomPagination.Raw,
    RapiddocsIr.CustomPagination
> = core.serialization.objectWithoutOptionalProperties({
    results: ResponseProperty,
});

export declare namespace CustomPagination {
    export interface Raw {
        results: ResponseProperty.Raw;
    }
}
