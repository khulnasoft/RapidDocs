/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedApi from "../../../../api/index";
import * as core from "../../../../core";

export const JsonLike: core.serialization.Schema<serializers.JsonLike.Raw, SeedApi.JsonLike> =
    core.serialization.undiscriminatedUnion([
        core.serialization.list(core.serialization.lazy(() => serializers.JsonLike)),
        core.serialization.record(
            core.serialization.string(),
            core.serialization.lazy(() => serializers.JsonLike),
        ),
        core.serialization.string(),
        core.serialization.number(),
        core.serialization.boolean(),
    ]);

export declare namespace JsonLike {
    export type Raw = serializers.JsonLike.Raw[] | Record<string, serializers.JsonLike.Raw> | string | number | boolean;
}
