/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
import * as serializers from "../../../../index";
import * as SeedServerSentEvents from "../../../../../api/index";
import * as core from "../../../../../core";
export declare const StreamCompletionRequest: core.serialization.Schema<serializers.StreamCompletionRequest.Raw, SeedServerSentEvents.StreamCompletionRequest>;
export declare namespace StreamCompletionRequest {
    interface Raw {
        query: string;
    }
}
