/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const SinglyLinkedListNodeAndListValue: core.serialization.ObjectSchema<
    serializers.SinglyLinkedListNodeAndListValue.Raw,
    SeedTrace.SinglyLinkedListNodeAndListValue
> = core.serialization.object({
    nodeId: core.serialization.lazy(() => serializers.NodeId),
    fullList: core.serialization.lazyObject(() => serializers.SinglyLinkedListValue),
});

export declare namespace SinglyLinkedListNodeAndListValue {
    export interface Raw {
        nodeId: serializers.NodeId.Raw;
        fullList: serializers.SinglyLinkedListValue.Raw;
    }
}
