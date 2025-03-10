/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedApi from "../../../../api/index";
import * as core from "../../../../core";

export const MetadataValue: core.serialization.Schema<serializers.MetadataValue.Raw, SeedApi.MetadataValue> =
    core.serialization.undiscriminatedUnion([
        core.serialization.number(),
        core.serialization.string(),
        core.serialization.boolean(),
        core.serialization.list(core.serialization.lazy(() => serializers.MetadataValue)),
    ]);

export declare namespace MetadataValue {
    type Raw = number | string | boolean | serializers.MetadataValue.Raw[];
}
