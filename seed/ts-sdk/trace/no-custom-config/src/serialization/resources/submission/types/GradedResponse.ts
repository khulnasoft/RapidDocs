/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
import { SubmissionId } from "./SubmissionId";
import { TestCaseResultWithStdout } from "./TestCaseResultWithStdout";

export const GradedResponse: core.serialization.ObjectSchema<serializers.GradedResponse.Raw, SeedTrace.GradedResponse> =
    core.serialization.object({
        submissionId: SubmissionId,
        testCases: core.serialization.record(core.serialization.string(), TestCaseResultWithStdout),
    });

export declare namespace GradedResponse {
    export interface Raw {
        submissionId: SubmissionId.Raw;
        testCases: Record<string, TestCaseResultWithStdout.Raw>;
    }
}
