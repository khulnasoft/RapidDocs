/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { ExampleTypeReferenceSchema } from "./ExampleTypeReferenceSchema";
import { ExampleResponseSchema } from "./ExampleResponseSchema";
import { ExampleCodeSampleSchema } from "./ExampleCodeSampleSchema";
import { WithName } from "../../commons/types/WithName";
import { WithDocsSchema } from "../../commons/types/WithDocsSchema";

export const ExampleEndpointCallSchema: core.serialization.ObjectSchema<
    serializers.ExampleEndpointCallSchema.Raw,
    RapiddocsDefinition.ExampleEndpointCallSchema
> = core.serialization
    .object({
        id: core.serialization.string().optional(),
        "path-parameters": core.serialization
            .record(core.serialization.string(), ExampleTypeReferenceSchema)
            .optional(),
        "query-parameters": core.serialization
            .record(core.serialization.string(), ExampleTypeReferenceSchema)
            .optional(),
        headers: core.serialization.record(core.serialization.string(), ExampleTypeReferenceSchema).optional(),
        request: ExampleTypeReferenceSchema.optional(),
        response: ExampleResponseSchema.optional(),
        "code-samples": core.serialization.list(ExampleCodeSampleSchema).optional(),
    })
    .extend(WithName)
    .extend(WithDocsSchema);

export declare namespace ExampleEndpointCallSchema {
    export interface Raw extends WithName.Raw, WithDocsSchema.Raw {
        id?: string | null;
        "path-parameters"?: Record<string, ExampleTypeReferenceSchema.Raw | undefined> | null;
        "query-parameters"?: Record<string, ExampleTypeReferenceSchema.Raw | undefined> | null;
        headers?: Record<string, ExampleTypeReferenceSchema.Raw | undefined> | null;
        request?: (ExampleTypeReferenceSchema.Raw | undefined) | null;
        response?: ExampleResponseSchema.Raw | null;
        "code-samples"?: ExampleCodeSampleSchema.Raw[] | null;
    }
}
