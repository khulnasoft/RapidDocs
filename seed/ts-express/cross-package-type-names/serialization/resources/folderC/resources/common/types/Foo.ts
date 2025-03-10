/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedCrossPackageTypeNames from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const Foo: core.serialization.ObjectSchema<serializers.folderC.Foo.Raw, SeedCrossPackageTypeNames.folderC.Foo> =
    core.serialization.object({
        barProperty: core.serialization.property("bar_property", core.serialization.string()),
    });

export declare namespace Foo {
    export interface Raw {
        bar_property: string;
    }
}
