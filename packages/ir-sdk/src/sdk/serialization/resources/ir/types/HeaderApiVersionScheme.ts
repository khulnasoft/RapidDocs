/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { HttpHeader } from "../../http/types/HttpHeader";
import { EnumTypeDeclaration } from "../../types/types/EnumTypeDeclaration";

export const HeaderApiVersionScheme: core.serialization.ObjectSchema<
    serializers.HeaderApiVersionScheme.Raw,
    RapiddocsIr.HeaderApiVersionScheme
> = core.serialization.objectWithoutOptionalProperties({
    header: HttpHeader,
    value: EnumTypeDeclaration,
});

export declare namespace HeaderApiVersionScheme {
    export interface Raw {
        header: HttpHeader.Raw;
        value: EnumTypeDeclaration.Raw;
    }
}
