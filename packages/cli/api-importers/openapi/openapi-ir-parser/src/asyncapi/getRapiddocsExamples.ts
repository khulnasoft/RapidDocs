import { getExtension } from "../getExtension";
import { RapiddocsAsyncAPIExtension } from "./rapiddocsExtensions";
import { AsyncAPIV2 } from "./v2";
import { AsyncAPIV3 } from "./v3";

export interface WebsocketSessionExampleMessage {
    type: "subscribe" | "publish";
    channelId?: string;
    messageId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

export interface WebsocketSessionExampleExtension {
    summary?: string;
    description?: string;
    queryParameters?: Record<string, string>;
    headers?: Record<string, string>;
    messages: WebsocketSessionExampleMessage[];
}

export function getRapiddocsExamples(
    channel: AsyncAPIV2.ChannelV2 | AsyncAPIV3.ChannelV3
): WebsocketSessionExampleExtension[] {
    return getExtension<WebsocketSessionExampleExtension[]>(channel, RapiddocsAsyncAPIExtension.RAPIDDOCS_EXAMPLES) ?? [];
}
