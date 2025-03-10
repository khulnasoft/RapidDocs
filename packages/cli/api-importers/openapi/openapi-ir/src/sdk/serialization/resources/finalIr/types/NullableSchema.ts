/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";
import { WithDescription } from "../../commons/types/WithDescription";
import { WithName } from "../../commons/types/WithName";
import { WithSdkGroupName } from "../../commons/types/WithSdkGroupName";
import { WithAvailability } from "../../commons/types/WithAvailability";
import { WithTitle } from "../../commons/types/WithTitle";
import { WithInline } from "../../commons/types/WithInline";

export const NullableSchema: core.serialization.ObjectSchema<
    serializers.NullableSchema.Raw,
    RapiddocsOpenapiIr.NullableSchema
> = core.serialization
    .objectWithoutOptionalProperties({
        value: core.serialization.lazy(() => serializers.Schema),
    })
    .extend(WithDescription)
    .extend(WithName)
    .extend(WithSdkGroupName)
    .extend(WithAvailability)
    .extend(WithTitle)
    .extend(WithInline);

export declare namespace NullableSchema {
    export interface Raw
        extends WithDescription.Raw,
            WithName.Raw,
            WithSdkGroupName.Raw,
            WithAvailability.Raw,
            WithTitle.Raw,
            WithInline.Raw {
        value: serializers.Schema.Raw;
    }
}
