// HACKHACK: copied from cli folder
import { LogLevel } from "@khulnasoft/logger";

export interface Log {
    level: LogLevel;
    parts: string[];
    prefix?: string;
    omitOnTTY?: boolean;
    time: Date;
}
