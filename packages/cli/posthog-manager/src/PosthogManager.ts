import { PosthogEvent } from "@khulnasoft/task-context";

export interface PosthogManager {
    sendEvent(event: PosthogEvent): void;
    identify(): void;
    flush(): Promise<void>;
}
