/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as SeedTrace from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { ParameterId } from "./ParameterId";

export const Parameter: core.serialization.ObjectSchema<serializers.v2.v3.Parameter.Raw, SeedTrace.v2.v3.Parameter> =
    core.serialization.object({
        parameterId: ParameterId,
        name: core.serialization.string(),
        variableType: core.serialization.lazy(() => serializers.VariableType),
    });

export declare namespace Parameter {
    export interface Raw {
        parameterId: ParameterId.Raw;
        name: string;
        variableType: serializers.VariableType.Raw;
    }
}
