/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { WithDocs } from "../../commons/types/WithDocs";

export const JsonResponseBody: core.serialization.ObjectSchema<
    serializers.JsonResponseBody.Raw,
    RapiddocsIr.JsonResponseBody
> = core.serialization
    .objectWithoutOptionalProperties({
        responseBodyType: core.serialization.lazy(() => serializers.TypeReference),
    })
    .extend(WithDocs);

export declare namespace JsonResponseBody {
    export interface Raw extends WithDocs.Raw {
        responseBodyType: serializers.TypeReference.Raw;
    }
}
