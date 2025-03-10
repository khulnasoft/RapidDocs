/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { WebhookMethodSchema } from "./WebhookMethodSchema";
import { HttpHeaderSchema } from "../../service/types/HttpHeaderSchema";
import { WebhookPayloadSchema } from "./WebhookPayloadSchema";
import { ExampleWebhookCallSchema } from "../../examples/types/ExampleWebhookCallSchema";
import { WithAvailability } from "../../commons/types/WithAvailability";
import { WithAudiences } from "../../commons/types/WithAudiences";
import { WithDocsSchema } from "../../commons/types/WithDocsSchema";
import { WithDisplayName } from "../../commons/types/WithDisplayName";

export const WebhookSchema: core.serialization.ObjectSchema<
    serializers.WebhookSchema.Raw,
    RapiddocsDefinition.WebhookSchema
> = core.serialization
    .object({
        method: WebhookMethodSchema,
        headers: core.serialization.record(core.serialization.string(), HttpHeaderSchema).optional(),
        payload: WebhookPayloadSchema,
        examples: core.serialization.list(ExampleWebhookCallSchema).optional(),
    })
    .extend(WithAvailability)
    .extend(WithAudiences)
    .extend(WithDocsSchema)
    .extend(WithDisplayName);

export declare namespace WebhookSchema {
    export interface Raw extends WithAvailability.Raw, WithAudiences.Raw, WithDocsSchema.Raw, WithDisplayName.Raw {
        method: WebhookMethodSchema.Raw;
        headers?: Record<string, HttpHeaderSchema.Raw> | null;
        payload: WebhookPayloadSchema.Raw;
        examples?: ExampleWebhookCallSchema.Raw[] | null;
    }
}
