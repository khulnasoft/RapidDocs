/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedApi from "../../../../api/index";
import * as core from "../../../../core";

export const User: core.serialization.ObjectSchema<serializers.User.Raw, SeedApi.User> = core.serialization.object({
    id: core.serialization.string(),
    username: core.serialization.string(),
    email: core.serialization.string().optional(),
    age: core.serialization.number().optional(),
    weight: core.serialization.number().optional(),
    metadata: core.serialization.lazy(() => serializers.Metadata).optional(),
});

export declare namespace User {
    interface Raw {
        id: string;
        username: string;
        email?: string | null;
        age?: number | null;
        weight?: number | null;
        metadata?: serializers.Metadata.Raw | null;
    }
}
