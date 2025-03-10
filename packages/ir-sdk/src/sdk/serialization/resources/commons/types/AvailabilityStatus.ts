/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";

export const AvailabilityStatus: core.serialization.Schema<
    serializers.AvailabilityStatus.Raw,
    RapiddocsIr.AvailabilityStatus
> = core.serialization.enum_(["IN_DEVELOPMENT", "PRE_RELEASE", "GENERAL_AVAILABILITY", "DEPRECATED"]);

export declare namespace AvailabilityStatus {
    export type Raw = "IN_DEVELOPMENT" | "PRE_RELEASE" | "GENERAL_AVAILABILITY" | "DEPRECATED";
}
