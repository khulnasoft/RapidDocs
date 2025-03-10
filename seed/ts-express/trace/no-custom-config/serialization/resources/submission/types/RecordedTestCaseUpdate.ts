/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const RecordedTestCaseUpdate: core.serialization.ObjectSchema<
    serializers.RecordedTestCaseUpdate.Raw,
    SeedTrace.RecordedTestCaseUpdate
> = core.serialization.object({
    testCaseId: core.serialization.lazy(() => serializers.v2.TestCaseId),
    traceResponsesSize: core.serialization.number(),
});

export declare namespace RecordedTestCaseUpdate {
    export interface Raw {
        testCaseId: serializers.v2.TestCaseId.Raw;
        traceResponsesSize: number;
    }
}
