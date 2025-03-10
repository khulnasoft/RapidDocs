/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as core from "../../../../../../core";

export const Request: core.serialization.Schema<
    serializers.endpoints.primitive.getAndReturnDouble.Request.Raw,
    number
> = core.serialization.number();

export declare namespace Request {
    export type Raw = number;
}

export const Response: core.serialization.Schema<
    serializers.endpoints.primitive.getAndReturnDouble.Response.Raw,
    number
> = core.serialization.number();

export declare namespace Response {
    export type Raw = number;
}
