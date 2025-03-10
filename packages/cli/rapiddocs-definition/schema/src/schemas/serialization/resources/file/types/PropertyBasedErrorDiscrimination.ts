/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";

export const PropertyBasedErrorDiscrimination: core.serialization.ObjectSchema<
    serializers.PropertyBasedErrorDiscrimination.Raw,
    RapiddocsDefinition.PropertyBasedErrorDiscrimination
> = core.serialization.object({
    strategy: core.serialization.stringLiteral("property"),
    "property-name": core.serialization.string(),
});

export declare namespace PropertyBasedErrorDiscrimination {
    export interface Raw {
        strategy: "property";
        "property-name": string;
    }
}
