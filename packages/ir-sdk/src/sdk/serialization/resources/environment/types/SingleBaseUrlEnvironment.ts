/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { EnvironmentId } from "./EnvironmentId";
import { Name } from "../../commons/types/Name";
import { EnvironmentUrl } from "./EnvironmentUrl";
import { WithDocs } from "../../commons/types/WithDocs";

export const SingleBaseUrlEnvironment: core.serialization.ObjectSchema<
    serializers.SingleBaseUrlEnvironment.Raw,
    RapiddocsIr.SingleBaseUrlEnvironment
> = core.serialization
    .objectWithoutOptionalProperties({
        id: EnvironmentId,
        name: Name,
        url: EnvironmentUrl,
    })
    .extend(WithDocs);

export declare namespace SingleBaseUrlEnvironment {
    export interface Raw extends WithDocs.Raw {
        id: EnvironmentId.Raw;
        name: Name.Raw;
        url: EnvironmentUrl.Raw;
    }
}
