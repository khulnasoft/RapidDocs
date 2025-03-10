/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedTrace from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { NonVoidFunctionSignature } from "./NonVoidFunctionSignature";
import { Files } from "./Files";
import { Language } from "../../../../commons/types/Language";
import { BasicTestCaseTemplate } from "./BasicTestCaseTemplate";

export const BasicCustomFiles: core.serialization.ObjectSchema<
    serializers.v2.BasicCustomFiles.Raw,
    SeedTrace.v2.BasicCustomFiles
> = core.serialization.object({
    methodName: core.serialization.string(),
    signature: NonVoidFunctionSignature,
    additionalFiles: core.serialization.record(Language, Files.optional()),
    basicTestCaseTemplate: BasicTestCaseTemplate,
});

export declare namespace BasicCustomFiles {
    export interface Raw {
        methodName: string;
        signature: NonVoidFunctionSignature.Raw;
        additionalFiles: Record<Language.Raw, Files.Raw | null | undefined>;
        basicTestCaseTemplate: BasicTestCaseTemplate.Raw;
    }
}
