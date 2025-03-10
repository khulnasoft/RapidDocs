/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsDefinition from "../../../index";

export interface DiscriminatedUnionSchema extends RapiddocsDefinition.BaseTypeDeclarationSchema {
    discriminant?: RapiddocsDefinition.UnionDiscriminant;
    extends?: RapiddocsDefinition.ObjectExtendsSchema;
    "base-properties"?: Record<string, RapiddocsDefinition.TypeReferenceSchema>;
    union: Record<string, RapiddocsDefinition.SingleUnionTypeSchema>;
}
