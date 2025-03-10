/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";
import { LiteralSchemaValue } from "./LiteralSchemaValue";
import { WithDescription } from "../../commons/types/WithDescription";
import { WithName } from "../../commons/types/WithName";
import { WithSdkGroupName } from "../../commons/types/WithSdkGroupName";
import { WithAvailability } from "../../commons/types/WithAvailability";
import { WithTitle } from "../../commons/types/WithTitle";

export const LiteralSchema: core.serialization.ObjectSchema<
    serializers.LiteralSchema.Raw,
    RapiddocsOpenapiIr.LiteralSchema
> = core.serialization
    .objectWithoutOptionalProperties({
        value: LiteralSchemaValue,
    })
    .extend(WithDescription)
    .extend(WithName)
    .extend(WithSdkGroupName)
    .extend(WithAvailability)
    .extend(WithTitle);

export declare namespace LiteralSchema {
    export interface Raw
        extends WithDescription.Raw,
            WithName.Raw,
            WithSdkGroupName.Raw,
            WithAvailability.Raw,
            WithTitle.Raw {
        value: LiteralSchemaValue.Raw;
    }
}
