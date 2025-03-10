/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedTrace from "../../../index";

export interface WorkspaceSubmitRequest {
    submissionId: SeedTrace.SubmissionId;
    language: SeedTrace.Language;
    submissionFiles: SeedTrace.SubmissionFileInfo[];
    userId?: string;
}
