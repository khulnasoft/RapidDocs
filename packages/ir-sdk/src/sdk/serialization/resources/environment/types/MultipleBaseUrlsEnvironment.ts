/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { EnvironmentId } from "./EnvironmentId";
import { Name } from "../../commons/types/Name";
import { EnvironmentBaseUrlId } from "./EnvironmentBaseUrlId";
import { EnvironmentUrl } from "./EnvironmentUrl";
import { WithDocs } from "../../commons/types/WithDocs";

export const MultipleBaseUrlsEnvironment: core.serialization.ObjectSchema<
    serializers.MultipleBaseUrlsEnvironment.Raw,
    RapiddocsIr.MultipleBaseUrlsEnvironment
> = core.serialization
    .objectWithoutOptionalProperties({
        id: EnvironmentId,
        name: Name,
        urls: core.serialization.record(EnvironmentBaseUrlId, EnvironmentUrl),
    })
    .extend(WithDocs);

export declare namespace MultipleBaseUrlsEnvironment {
    export interface Raw extends WithDocs.Raw {
        id: EnvironmentId.Raw;
        name: Name.Raw;
        urls: Record<EnvironmentBaseUrlId.Raw, EnvironmentUrl.Raw>;
    }
}
