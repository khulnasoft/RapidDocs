/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { EnvironmentBaseUrlId } from "./EnvironmentBaseUrlId";
import { Name } from "../../commons/types/Name";

export const EnvironmentBaseUrlWithId: core.serialization.ObjectSchema<
    serializers.EnvironmentBaseUrlWithId.Raw,
    RapiddocsIr.EnvironmentBaseUrlWithId
> = core.serialization.objectWithoutOptionalProperties({
    id: EnvironmentBaseUrlId,
    name: Name,
});

export declare namespace EnvironmentBaseUrlWithId {
    export interface Raw {
        id: EnvironmentBaseUrlId.Raw;
        name: Name.Raw;
    }
}
