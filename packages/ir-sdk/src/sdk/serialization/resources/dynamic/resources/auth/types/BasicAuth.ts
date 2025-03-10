/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Name } from "../../../../commons/types/Name";

export const BasicAuth: core.serialization.ObjectSchema<serializers.dynamic.BasicAuth.Raw, RapiddocsIr.dynamic.BasicAuth> =
    core.serialization.objectWithoutOptionalProperties({
        username: Name,
        password: Name,
    });

export declare namespace BasicAuth {
    export interface Raw {
        username: Name.Raw;
        password: Name.Raw;
    }
}
