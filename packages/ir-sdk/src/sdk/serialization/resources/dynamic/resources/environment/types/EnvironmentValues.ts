/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { EnvironmentId } from "../../../../environment/types/EnvironmentId";
import { MultipleEnvironmentUrlValues } from "./MultipleEnvironmentUrlValues";

export const EnvironmentValues: core.serialization.Schema<
    serializers.dynamic.EnvironmentValues.Raw,
    RapiddocsIr.dynamic.EnvironmentValues
> = core.serialization.undiscriminatedUnion([EnvironmentId, MultipleEnvironmentUrlValues]);

export declare namespace EnvironmentValues {
    export type Raw = EnvironmentId.Raw | MultipleEnvironmentUrlValues.Raw;
}
