/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";

export const SupportedSdkLanguageSchema: core.serialization.Schema<
    serializers.SupportedSdkLanguageSchema.Raw,
    RapiddocsDefinition.SupportedSdkLanguageSchema
> = core.serialization.enum_([
    "curl",
    "python",
    "javascript",
    "typescript",
    "go",
    "ruby",
    "csharp",
    "java",
    "js",
    "node",
    "ts",
    "nodets",
    "golang",
    "dotnet",
    "jvm",
    "c#",
]);

export declare namespace SupportedSdkLanguageSchema {
    export type Raw =
        | "curl"
        | "python"
        | "javascript"
        | "typescript"
        | "go"
        | "ruby"
        | "csharp"
        | "java"
        | "js"
        | "node"
        | "ts"
        | "nodets"
        | "golang"
        | "dotnet"
        | "jvm"
        | "c#";
}
