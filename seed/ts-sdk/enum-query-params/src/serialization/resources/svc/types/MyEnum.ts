/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedApi from "../../../../api";
import * as core from "../../../../core";

export const MyEnum: core.serialization.Schema<serializers.MyEnum.Raw, SeedApi.MyEnum> = core.serialization.enum_([
    "one",
    "two",
    "three",
    "four",
]);

export declare namespace MyEnum {
    type Raw = "one" | "two" | "three" | "four";
}
