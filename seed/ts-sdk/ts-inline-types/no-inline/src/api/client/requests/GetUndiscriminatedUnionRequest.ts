/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedObject from "../../index";

/**
 * @example
 *     {
 *         bar: {
 *             foo: "foo",
 *             bar: {
 *                 foo: "foo",
 *                 ref: {
 *                     foo: "foo"
 *                 }
 *             },
 *             ref: {
 *                 foo: "foo"
 *             }
 *         },
 *         foo: "foo"
 *     }
 */
export interface GetUndiscriminatedUnionRequest {
    bar: SeedObject.UndiscriminatedUnion1;
    foo: string;
}
