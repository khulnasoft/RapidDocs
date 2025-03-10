/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { EnvironmentVariable } from "./EnvironmentVariable";

export const RubyGemsGithubPublishInfo: core.serialization.ObjectSchema<
    serializers.generatorExec.RubyGemsGithubPublishInfo.Raw,
    RapiddocsIr.generatorExec.RubyGemsGithubPublishInfo
> = core.serialization.objectWithoutOptionalProperties({
    registryUrl: core.serialization.string(),
    packageName: core.serialization.string(),
    apiKeyEnvironmentVariable: EnvironmentVariable,
    shouldGeneratePublishWorkflow: core.serialization.boolean().optional(),
});

export declare namespace RubyGemsGithubPublishInfo {
    export interface Raw {
        registryUrl: string;
        packageName: string;
        apiKeyEnvironmentVariable: EnvironmentVariable.Raw;
        shouldGeneratePublishWorkflow?: boolean | null;
    }
}
