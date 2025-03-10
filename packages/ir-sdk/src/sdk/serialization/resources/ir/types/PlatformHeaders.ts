/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { UserAgent } from "./UserAgent";

export const PlatformHeaders: core.serialization.ObjectSchema<serializers.PlatformHeaders.Raw, RapiddocsIr.PlatformHeaders> =
    core.serialization.objectWithoutOptionalProperties({
        language: core.serialization.string(),
        sdkName: core.serialization.string(),
        sdkVersion: core.serialization.string(),
        userAgent: UserAgent.optional(),
    });

export declare namespace PlatformHeaders {
    export interface Raw {
        language: string;
        sdkName: string;
        sdkVersion: string;
        userAgent?: UserAgent.Raw | null;
    }
}
