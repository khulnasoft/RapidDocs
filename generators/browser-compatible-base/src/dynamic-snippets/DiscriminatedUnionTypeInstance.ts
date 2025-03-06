import { RapiddocsIr } from "@fern-api/dynamic-ir-sdk";

/**
 * A discriminated union type instance that can be converted into a language-specific AST node.
 */
export interface DiscriminatedUnionTypeInstance {
    discriminantValue: RapiddocsIr.NameAndWireValue;
    singleDiscriminatedUnionType: RapiddocsIr.dynamic.SingleDiscriminatedUnionType;
    value: unknown;
}
