/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";
import { WithDescription } from "../../commons/types/WithDescription";
import { WithSource } from "../../commons/types/WithSource";
import { WithStatusCode } from "../../commons/types/WithStatusCode";

export const JsonResponse: core.serialization.ObjectSchema<serializers.JsonResponse.Raw, RapiddocsOpenapiIr.JsonResponse> =
    core.serialization
        .objectWithoutOptionalProperties({
            schema: core.serialization.lazy(() => serializers.Schema),
            responseProperty: core.serialization.string().optional(),
        })
        .extend(WithDescription)
        .extend(WithSource)
        .extend(WithStatusCode);

export declare namespace JsonResponse {
    export interface Raw extends WithDescription.Raw, WithSource.Raw, WithStatusCode.Raw {
        schema: serializers.Schema.Raw;
        responseProperty?: string | null;
    }
}
