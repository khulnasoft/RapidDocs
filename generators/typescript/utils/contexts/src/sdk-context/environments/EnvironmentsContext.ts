import { Reference } from "@rapiddocs-typescript/commons";

import { GeneratedEnvironments } from "./GeneratedEnvironments";

export interface EnvironmentsContext {
    getGeneratedEnvironments: () => GeneratedEnvironments;
    getReferenceToEnvironmentsEnum: () => Reference;
    getReferenceToFirstEnvironmentEnum: () => Reference | undefined;
    getReferenceToEnvironmentUrls: () => Reference;
}
