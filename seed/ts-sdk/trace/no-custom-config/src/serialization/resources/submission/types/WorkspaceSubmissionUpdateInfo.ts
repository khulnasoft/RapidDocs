/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
import { RunningSubmissionState } from "./RunningSubmissionState";
import { WorkspaceRunDetails } from "./WorkspaceRunDetails";
import { WorkspaceTracedUpdate } from "./WorkspaceTracedUpdate";
import { ErrorInfo } from "./ErrorInfo";

export const WorkspaceSubmissionUpdateInfo: core.serialization.Schema<
    serializers.WorkspaceSubmissionUpdateInfo.Raw,
    SeedTrace.WorkspaceSubmissionUpdateInfo
> = core.serialization
    .union("type", {
        running: core.serialization.object({
            value: RunningSubmissionState,
        }),
        ran: WorkspaceRunDetails,
        stopped: core.serialization.object({}),
        traced: core.serialization.object({}),
        tracedV2: WorkspaceTracedUpdate,
        errored: core.serialization.object({
            value: ErrorInfo,
        }),
        finished: core.serialization.object({}),
    })
    .transform<SeedTrace.WorkspaceSubmissionUpdateInfo>({
        transform: (value) => value,
        untransform: (value) => value,
    });

export declare namespace WorkspaceSubmissionUpdateInfo {
    export type Raw =
        | WorkspaceSubmissionUpdateInfo.Running
        | WorkspaceSubmissionUpdateInfo.Ran
        | WorkspaceSubmissionUpdateInfo.Stopped
        | WorkspaceSubmissionUpdateInfo.Traced
        | WorkspaceSubmissionUpdateInfo.TracedV2
        | WorkspaceSubmissionUpdateInfo.Errored
        | WorkspaceSubmissionUpdateInfo.Finished;

    export interface Running {
        type: "running";
        value: RunningSubmissionState.Raw;
    }

    export interface Ran extends WorkspaceRunDetails.Raw {
        type: "ran";
    }

    export interface Stopped {
        type: "stopped";
    }

    export interface Traced {
        type: "traced";
    }

    export interface TracedV2 extends WorkspaceTracedUpdate.Raw {
        type: "tracedV2";
    }

    export interface Errored {
        type: "errored";
        value: ErrorInfo.Raw;
    }

    export interface Finished {
        type: "finished";
    }
}
