import { noop } from "@khulnasoft/core-utils";

import { createLogger } from "./createLogger";

export const NOOP_LOGGER = createLogger(noop);
