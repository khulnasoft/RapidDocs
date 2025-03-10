/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { WithName } from "../../commons/types/WithName";

export const SingleUnionTypeKeySchema: core.serialization.ObjectSchema<
    serializers.SingleUnionTypeKeySchema.Raw,
    RapiddocsDefinition.SingleUnionTypeKeySchema
> = core.serialization
    .object({
        value: core.serialization.string(),
    })
    .extend(WithName);

export declare namespace SingleUnionTypeKeySchema {
    export interface Raw extends WithName.Raw {
        value: string;
    }
}
