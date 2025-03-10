/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { GeneratorsOpenApiObjectSchema } from "./GeneratorsOpenApiObjectSchema";

export const GeneratorsOpenApiSchema: core.serialization.Schema<
    serializers.GeneratorsOpenApiSchema.Raw,
    RapiddocsDefinition.GeneratorsOpenApiSchema
> = core.serialization.undiscriminatedUnion([GeneratorsOpenApiObjectSchema, core.serialization.string()]);

export declare namespace GeneratorsOpenApiSchema {
    export type Raw = GeneratorsOpenApiObjectSchema.Raw | string;
}
