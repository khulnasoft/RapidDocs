/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedTrace from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const TestCaseV2: core.serialization.ObjectSchema<serializers.v2.TestCaseV2.Raw, SeedTrace.v2.TestCaseV2> =
    core.serialization.object({
        metadata: core.serialization.lazyObject(() => serializers.v2.TestCaseMetadata),
        implementation: core.serialization.lazy(() => serializers.v2.TestCaseImplementationReference),
        arguments: core.serialization.record(
            core.serialization.lazy(() => serializers.v2.ParameterId),
            core.serialization.lazy(() => serializers.VariableValue),
        ),
        expects: core.serialization.lazyObject(() => serializers.v2.TestCaseExpects).optional(),
    });

export declare namespace TestCaseV2 {
    export interface Raw {
        metadata: serializers.v2.TestCaseMetadata.Raw;
        implementation: serializers.v2.TestCaseImplementationReference.Raw;
        arguments: Record<serializers.v2.ParameterId.Raw, serializers.VariableValue.Raw>;
        expects?: serializers.v2.TestCaseExpects.Raw | null;
    }
}
