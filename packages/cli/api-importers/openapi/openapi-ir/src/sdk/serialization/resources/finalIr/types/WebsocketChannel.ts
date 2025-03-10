/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";
import { SdkGroupName } from "../../commons/types/SdkGroupName";
import { WebsocketHandshake } from "./WebsocketHandshake";
import { WebsocketServer } from "./WebsocketServer";
import { WebsocketSessionExample } from "./WebsocketSessionExample";
import { WithDescription } from "../../commons/types/WithDescription";
import { WithSource } from "../../commons/types/WithSource";
import { SdkGroup } from "../../commons/types/SdkGroup";

export const WebsocketChannel: core.serialization.ObjectSchema<
    serializers.WebsocketChannel.Raw,
    RapiddocsOpenapiIr.WebsocketChannel
> = core.serialization
    .objectWithoutOptionalProperties({
        audiences: core.serialization.list(core.serialization.string()),
        path: core.serialization.string(),
        groupName: SdkGroupName,
        summary: core.serialization.string().optional(),
        handshake: WebsocketHandshake,
        publish: core.serialization.lazy(() => serializers.Schema).optional(),
        subscribe: core.serialization.lazy(() => serializers.Schema).optional(),
        servers: core.serialization.list(WebsocketServer),
        examples: core.serialization.list(WebsocketSessionExample),
    })
    .extend(WithDescription)
    .extend(WithSource);

export declare namespace WebsocketChannel {
    export interface Raw extends WithDescription.Raw, WithSource.Raw {
        audiences: string[];
        path: string;
        groupName: SdkGroupName.Raw;
        summary?: string | null;
        handshake: WebsocketHandshake.Raw;
        publish?: serializers.Schema.Raw | null;
        subscribe?: serializers.Schema.Raw | null;
        servers: WebsocketServer.Raw[];
        examples: WebsocketSessionExample.Raw[];
    }
}
