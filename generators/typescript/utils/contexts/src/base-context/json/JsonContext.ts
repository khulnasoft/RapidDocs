import { Reference } from "@rapiddocs-typescript/commons";

export interface JsonContext {
    getReferenceToToJson: () => Reference;
    getReferenceToFromJson: () => Reference;
}
