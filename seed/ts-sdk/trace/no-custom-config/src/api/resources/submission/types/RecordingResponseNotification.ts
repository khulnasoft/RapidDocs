/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedTrace from "../../../index";

export interface RecordingResponseNotification {
    submissionId: SeedTrace.SubmissionId;
    testCaseId?: string;
    lineNumber: number;
    lightweightStackInfo: SeedTrace.LightweightStackframeInformation;
    tracedFile?: SeedTrace.TracedFile;
}
