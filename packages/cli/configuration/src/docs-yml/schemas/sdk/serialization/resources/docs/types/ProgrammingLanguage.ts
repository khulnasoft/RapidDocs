/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDocsConfig from "../../../../api/index";
import * as core from "../../../../core";

export const ProgrammingLanguage: core.serialization.Schema<
    serializers.ProgrammingLanguage.Raw,
    RapiddocsDocsConfig.ProgrammingLanguage
> = core.serialization.enum_([
    "typescript",
    "javascript",
    "python",
    "java",
    "go",
    "ruby",
    "csharp",
    "nodets",
    "nodejs",
    "dotnet",
    "curl",
    "jvm",
    "ts",
    "js",
]);

export declare namespace ProgrammingLanguage {
    export type Raw =
        | "typescript"
        | "javascript"
        | "python"
        | "java"
        | "go"
        | "ruby"
        | "csharp"
        | "nodets"
        | "nodejs"
        | "dotnet"
        | "curl"
        | "jvm"
        | "ts"
        | "js";
}
