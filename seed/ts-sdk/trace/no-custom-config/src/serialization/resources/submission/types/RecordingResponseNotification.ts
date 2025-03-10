/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
import { SubmissionId } from "./SubmissionId";
import { LightweightStackframeInformation } from "./LightweightStackframeInformation";
import { TracedFile } from "./TracedFile";

export const RecordingResponseNotification: core.serialization.ObjectSchema<
    serializers.RecordingResponseNotification.Raw,
    SeedTrace.RecordingResponseNotification
> = core.serialization.object({
    submissionId: SubmissionId,
    testCaseId: core.serialization.string().optional(),
    lineNumber: core.serialization.number(),
    lightweightStackInfo: LightweightStackframeInformation,
    tracedFile: TracedFile.optional(),
});

export declare namespace RecordingResponseNotification {
    export interface Raw {
        submissionId: SubmissionId.Raw;
        testCaseId?: string | null;
        lineNumber: number;
        lightweightStackInfo: LightweightStackframeInformation.Raw;
        tracedFile?: TracedFile.Raw | null;
    }
}
