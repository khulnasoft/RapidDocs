/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { NameAndWireValue } from "../../commons/types/NameAndWireValue";
import { ObjectPropertyAccess } from "./ObjectPropertyAccess";
import { Declaration } from "../../commons/types/Declaration";

export const ObjectProperty: core.serialization.ObjectSchema<serializers.ObjectProperty.Raw, RapiddocsIr.ObjectProperty> =
    core.serialization
        .objectWithoutOptionalProperties({
            name: NameAndWireValue,
            valueType: core.serialization.lazy(() => serializers.TypeReference),
            propertyAccess: ObjectPropertyAccess.optional(),
        })
        .extend(Declaration);

export declare namespace ObjectProperty {
    export interface Raw extends Declaration.Raw {
        name: NameAndWireValue.Raw;
        valueType: serializers.TypeReference.Raw;
        propertyAccess?: ObjectPropertyAccess.Raw | null;
    }
}
