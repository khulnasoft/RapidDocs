/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../index";
import * as SeedExtends from "../../api/index";
import * as core from "../../core";
import { Docs } from "./Docs";

export const ExampleType: core.serialization.ObjectSchema<serializers.ExampleType.Raw, SeedExtends.ExampleType> =
    core.serialization
        .object({
            name: core.serialization.string(),
        })
        .extend(Docs);

export declare namespace ExampleType {
    export interface Raw extends Docs.Raw {
        name: string;
    }
}
