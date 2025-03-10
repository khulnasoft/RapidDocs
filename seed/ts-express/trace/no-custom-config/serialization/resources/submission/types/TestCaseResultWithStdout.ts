/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const TestCaseResultWithStdout: core.serialization.ObjectSchema<
    serializers.TestCaseResultWithStdout.Raw,
    SeedTrace.TestCaseResultWithStdout
> = core.serialization.object({
    result: core.serialization.lazyObject(() => serializers.TestCaseResult),
    stdout: core.serialization.string(),
});

export declare namespace TestCaseResultWithStdout {
    export interface Raw {
        result: serializers.TestCaseResult.Raw;
        stdout: string;
    }
}
