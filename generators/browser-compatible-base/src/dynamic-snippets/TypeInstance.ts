import { RapiddocsIr } from "@fern-api/dynamic-ir-sdk";

/**
 * A type instance that can be converted into a language-specific AST node.
 *
 * The 'type' and 'value' are used to convert the AST node itself, and the name
 * is (optionally) used within the dynamic snippet, e.g. for named fields.
 */
export interface TypeInstance {
    name: RapiddocsIr.NameAndWireValue;
    typeReference: RapiddocsIr.dynamic.TypeReference;
    value: unknown;
}
