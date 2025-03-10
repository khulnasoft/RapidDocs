/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDocsConfig from "../../../../api/index";
import * as core from "../../../../core";

export const VersionAvailability: core.serialization.Schema<
    serializers.VersionAvailability.Raw,
    RapiddocsDocsConfig.VersionAvailability
> = core.serialization.enum_(["deprecated", "ga", "stable", "beta"]);

export declare namespace VersionAvailability {
    export type Raw = "deprecated" | "ga" | "stable" | "beta";
}
