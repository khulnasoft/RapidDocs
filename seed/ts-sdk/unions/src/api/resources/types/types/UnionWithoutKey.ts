/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedUnions from "../../../index";

export type UnionWithoutKey =
    | SeedUnions.UnionWithoutKey.Foo
    /**
     * This is a bar field. */
    | SeedUnions.UnionWithoutKey.Bar;

export namespace UnionWithoutKey {
    export interface Foo extends SeedUnions.Foo {
        type: "foo";
    }

    export interface Bar extends SeedUnions.Bar {
        type: "bar";
    }
}
