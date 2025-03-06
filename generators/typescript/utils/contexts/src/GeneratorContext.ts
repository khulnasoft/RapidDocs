import { Logger } from "@khulnasoft/logger";

export interface GeneratorContext {
    logger: Logger;
    version: string | undefined;
    fail: () => void;
}
