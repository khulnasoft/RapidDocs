import { AbstractAstNode } from "@khulnasoft/base-generator";

import { Writer } from "./Writer";

export abstract class AstNode extends AbstractAstNode {
    /**
     * Writes the node to a string.
     */
    public toString(): string {
        const writer = new Writer();
        this.write(writer);
        return writer.toString();
    }
}
