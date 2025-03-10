/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
import { Language } from "../../commons/types/Language";
import { ExecutionSessionStatus } from "./ExecutionSessionStatus";

export const ExecutionSessionState: core.serialization.ObjectSchema<
    serializers.ExecutionSessionState.Raw,
    SeedTrace.ExecutionSessionState
> = core.serialization.object({
    lastTimeContacted: core.serialization.string().optional(),
    sessionId: core.serialization.string(),
    isWarmInstance: core.serialization.boolean(),
    awsTaskId: core.serialization.string().optional(),
    language: Language,
    status: ExecutionSessionStatus,
});

export declare namespace ExecutionSessionState {
    export interface Raw {
        lastTimeContacted?: string | null;
        sessionId: string;
        isWarmInstance: boolean;
        awsTaskId?: string | null;
        language: Language.Raw;
        status: ExecutionSessionStatus.Raw;
    }
}
