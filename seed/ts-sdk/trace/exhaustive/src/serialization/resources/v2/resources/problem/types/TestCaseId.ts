/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedTrace from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const TestCaseId: core.serialization.Schema<serializers.v2.TestCaseId.Raw, SeedTrace.v2.TestCaseId> =
    core.serialization.string().transform({
        transform: SeedTrace.v2.TestCaseId,
        untransform: (value) => value,
    });

export declare namespace TestCaseId {
    export type Raw = string;
}
