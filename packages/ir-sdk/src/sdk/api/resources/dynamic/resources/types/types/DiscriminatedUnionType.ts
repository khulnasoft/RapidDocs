/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../../../index";

export interface DiscriminatedUnionType {
    declaration: RapiddocsIr.dynamic.Declaration;
    discriminant: RapiddocsIr.NameAndWireValue;
    /** Map from the discriminant value (e.g. "user") to the type (e.g. User). */
    types: Record<string, RapiddocsIr.dynamic.SingleDiscriminatedUnionType>;
}
