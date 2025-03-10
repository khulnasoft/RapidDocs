/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsConjure from "../../../../api/index";
import * as core from "../../../../core";
import { ConjureEnumWithDocs } from "./ConjureEnumWithDocs";

export const ConjureEnumVariant: core.serialization.Schema<
    serializers.ConjureEnumVariant.Raw,
    RapiddocsConjure.ConjureEnumVariant
> = core.serialization.undiscriminatedUnion([core.serialization.string(), ConjureEnumWithDocs]);

export declare namespace ConjureEnumVariant {
    export type Raw = string | ConjureEnumWithDocs.Raw;
}
