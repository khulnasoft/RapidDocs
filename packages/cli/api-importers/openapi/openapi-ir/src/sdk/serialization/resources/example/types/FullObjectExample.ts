/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";
import { PropertyKey } from "./PropertyKey";

export const FullObjectExample: core.serialization.ObjectSchema<
    serializers.FullObjectExample.Raw,
    RapiddocsOpenapiIr.FullObjectExample
> = core.serialization.objectWithoutOptionalProperties({
    properties: core.serialization.record(
        PropertyKey,
        core.serialization.lazy(() => serializers.FullExample),
    ),
});

export declare namespace FullObjectExample {
    export interface Raw {
        properties: Record<PropertyKey.Raw, serializers.FullExample.Raw>;
    }
}
