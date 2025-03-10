/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../index";
import * as SeedValidation from "../../../api/index";
import * as core from "../../../core";
import { Shape } from "../../types/Shape";

export const CreateRequest: core.serialization.Schema<serializers.CreateRequest.Raw, SeedValidation.CreateRequest> =
    core.serialization.object({
        decimal: core.serialization.number(),
        even: core.serialization.number(),
        name: core.serialization.string(),
        shape: Shape,
    });

export declare namespace CreateRequest {
    export interface Raw {
        decimal: number;
        even: number;
        name: string;
        shape: Shape.Raw;
    }
}
