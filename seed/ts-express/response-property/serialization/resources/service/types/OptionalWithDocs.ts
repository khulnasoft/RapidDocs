/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedResponseProperty from "../../../../api/index";
import * as core from "../../../../core";

export const OptionalWithDocs: core.serialization.Schema<
    serializers.OptionalWithDocs.Raw,
    SeedResponseProperty.OptionalWithDocs
> = core.serialization.lazyObject(() => serializers.WithDocs).optional();

export declare namespace OptionalWithDocs {
    export type Raw = serializers.WithDocs.Raw | null | undefined;
}
