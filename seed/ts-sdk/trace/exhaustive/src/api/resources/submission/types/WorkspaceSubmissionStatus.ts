/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedTrace from "../../../index";

export type WorkspaceSubmissionStatus =
    | SeedTrace.WorkspaceSubmissionStatus.Stopped
    | SeedTrace.WorkspaceSubmissionStatus.Errored
    | SeedTrace.WorkspaceSubmissionStatus.Running
    | SeedTrace.WorkspaceSubmissionStatus.Ran
    | SeedTrace.WorkspaceSubmissionStatus.Traced
    | SeedTrace.WorkspaceSubmissionStatus._Unknown;

export namespace WorkspaceSubmissionStatus {
    export interface Stopped extends _Utils {
        type: "stopped";
    }

    export interface Errored extends _Utils {
        type: "errored";
        value: SeedTrace.ErrorInfo;
    }

    export interface Running extends _Utils {
        type: "running";
        value: SeedTrace.RunningSubmissionState;
    }

    export interface Ran extends SeedTrace.WorkspaceRunDetails, _Utils {
        type: "ran";
    }

    export interface Traced extends SeedTrace.WorkspaceRunDetails, _Utils {
        type: "traced";
    }

    export interface _Unknown extends _Utils {
        type: void;
    }

    export interface _Utils {
        _visit: <_Result>(visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        stopped: () => _Result;
        errored: (value: SeedTrace.ErrorInfo) => _Result;
        running: (value: SeedTrace.RunningSubmissionState) => _Result;
        ran: (value: SeedTrace.WorkspaceRunDetails) => _Result;
        traced: (value: SeedTrace.WorkspaceRunDetails) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const WorkspaceSubmissionStatus = {
    stopped: (): SeedTrace.WorkspaceSubmissionStatus.Stopped => {
        return {
            type: "stopped",
            _visit: function <_Result>(
                this: SeedTrace.WorkspaceSubmissionStatus.Stopped,
                visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>,
            ) {
                return SeedTrace.WorkspaceSubmissionStatus._visit(this, visitor);
            },
        };
    },

    errored: (value: SeedTrace.ErrorInfo): SeedTrace.WorkspaceSubmissionStatus.Errored => {
        return {
            value: value,
            type: "errored",
            _visit: function <_Result>(
                this: SeedTrace.WorkspaceSubmissionStatus.Errored,
                visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>,
            ) {
                return SeedTrace.WorkspaceSubmissionStatus._visit(this, visitor);
            },
        };
    },

    running: (value: SeedTrace.RunningSubmissionState): SeedTrace.WorkspaceSubmissionStatus.Running => {
        return {
            value: value,
            type: "running",
            _visit: function <_Result>(
                this: SeedTrace.WorkspaceSubmissionStatus.Running,
                visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>,
            ) {
                return SeedTrace.WorkspaceSubmissionStatus._visit(this, visitor);
            },
        };
    },

    ran: (value: SeedTrace.WorkspaceRunDetails): SeedTrace.WorkspaceSubmissionStatus.Ran => {
        return {
            ...value,
            type: "ran",
            _visit: function <_Result>(
                this: SeedTrace.WorkspaceSubmissionStatus.Ran,
                visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>,
            ) {
                return SeedTrace.WorkspaceSubmissionStatus._visit(this, visitor);
            },
        };
    },

    traced: (value: SeedTrace.WorkspaceRunDetails): SeedTrace.WorkspaceSubmissionStatus.Traced => {
        return {
            ...value,
            type: "traced",
            _visit: function <_Result>(
                this: SeedTrace.WorkspaceSubmissionStatus.Traced,
                visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>,
            ) {
                return SeedTrace.WorkspaceSubmissionStatus._visit(this, visitor);
            },
        };
    },

    _unknown: (value: { type: string }): SeedTrace.WorkspaceSubmissionStatus._Unknown => {
        return {
            ...(value as any),
            _visit: function <_Result>(
                this: SeedTrace.WorkspaceSubmissionStatus._Unknown,
                visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>,
            ) {
                return SeedTrace.WorkspaceSubmissionStatus._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(
        value: SeedTrace.WorkspaceSubmissionStatus,
        visitor: SeedTrace.WorkspaceSubmissionStatus._Visitor<_Result>,
    ): _Result => {
        switch (value.type) {
            case "stopped":
                return visitor.stopped();
            case "errored":
                return visitor.errored(value.value);
            case "running":
                return visitor.running(value.value);
            case "ran":
                return visitor.ran(value);
            case "traced":
                return visitor.traced(value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
