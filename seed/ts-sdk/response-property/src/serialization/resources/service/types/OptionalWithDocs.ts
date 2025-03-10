/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedResponseProperty from "../../../../api/index";
import * as core from "../../../../core";
import { WithDocs } from "./WithDocs";

export const OptionalWithDocs: core.serialization.Schema<
    serializers.OptionalWithDocs.Raw,
    SeedResponseProperty.OptionalWithDocs
> = WithDocs.optional();

export declare namespace OptionalWithDocs {
    export type Raw = WithDocs.Raw | null | undefined;
}
