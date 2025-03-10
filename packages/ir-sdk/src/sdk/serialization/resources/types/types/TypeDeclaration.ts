/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { DeclaredTypeName } from "./DeclaredTypeName";
import { Type } from "./Type";
import { ExampleType } from "./ExampleType";
import { TypeId } from "../../commons/types/TypeId";
import { Encoding } from "./Encoding";
import { Source } from "./Source";
import { Declaration } from "../../commons/types/Declaration";

export const TypeDeclaration: core.serialization.ObjectSchema<serializers.TypeDeclaration.Raw, RapiddocsIr.TypeDeclaration> =
    core.serialization
        .objectWithoutOptionalProperties({
            name: DeclaredTypeName,
            shape: Type,
            autogeneratedExamples: core.serialization.list(ExampleType),
            userProvidedExamples: core.serialization.list(ExampleType),
            referencedTypes: core.serialization.set(TypeId),
            encoding: Encoding.optional(),
            source: Source.optional(),
            inline: core.serialization.boolean().optional(),
        })
        .extend(Declaration);

export declare namespace TypeDeclaration {
    export interface Raw extends Declaration.Raw {
        name: DeclaredTypeName.Raw;
        shape: Type.Raw;
        autogeneratedExamples: ExampleType.Raw[];
        userProvidedExamples: ExampleType.Raw[];
        referencedTypes: TypeId.Raw[];
        encoding?: Encoding.Raw | null;
        source?: Source.Raw | null;
        inline?: boolean | null;
    }
}
