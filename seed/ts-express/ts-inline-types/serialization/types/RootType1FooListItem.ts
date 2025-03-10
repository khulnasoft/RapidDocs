/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../index";
import * as SeedObject from "../../api/index";
import * as core from "../../core";

export const RootType1FooListItem: core.serialization.ObjectSchema<
    serializers.RootType1FooListItem.Raw,
    SeedObject.RootType1FooListItem
> = core.serialization.object({
    foo: core.serialization.string(),
    ref: core.serialization.lazyObject(() => serializers.ReferenceType),
});

export declare namespace RootType1FooListItem {
    export interface Raw {
        foo: string;
        ref: serializers.ReferenceType.Raw;
    }
}
