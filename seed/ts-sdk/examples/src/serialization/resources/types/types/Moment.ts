/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedExamples from "../../../../api";
import * as core from "../../../../core";

export const Moment: core.serialization.ObjectSchema<serializers.Moment.Raw, SeedExamples.Moment> =
    core.serialization.object({
        id: core.serialization.string(),
        date: core.serialization.string(),
        datetime: core.serialization.date(),
    });

export declare namespace Moment {
    interface Raw {
        id: string;
        date: string;
        datetime: string;
    }
}
