import { Reference } from "@rapiddocs-typescript/commons";

import { GeneratedVersion } from "./GeneratedVersion";

export interface VersionContext {
    getGeneratedVersion: () => GeneratedVersion | undefined;
    getReferenceToVersionEnum: () => Reference | undefined;
}
