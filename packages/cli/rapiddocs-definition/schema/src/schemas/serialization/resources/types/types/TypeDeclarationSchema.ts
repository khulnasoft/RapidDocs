/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { ObjectSchema } from "./ObjectSchema";
import { EnumSchema } from "./EnumSchema";
import { DiscriminatedUnionSchema } from "./DiscriminatedUnionSchema";
import { UndiscriminatedUnionSchema } from "./UndiscriminatedUnionSchema";
import { AliasSchema } from "./AliasSchema";

export const TypeDeclarationSchema: core.serialization.Schema<
    serializers.TypeDeclarationSchema.Raw,
    RapiddocsDefinition.TypeDeclarationSchema
> = core.serialization.undiscriminatedUnion([
    core.serialization.string(),
    ObjectSchema,
    EnumSchema,
    DiscriminatedUnionSchema,
    UndiscriminatedUnionSchema,
    AliasSchema,
]);

export declare namespace TypeDeclarationSchema {
    export type Raw =
        | string
        | ObjectSchema.Raw
        | EnumSchema.Raw
        | DiscriminatedUnionSchema.Raw
        | UndiscriminatedUnionSchema.Raw
        | AliasSchema.Raw;
}
