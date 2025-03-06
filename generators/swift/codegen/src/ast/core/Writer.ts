import { AbstractWriter } from "@khulnasoft/base-generator";

export class Writer extends AbstractWriter {
    public toString(): string {
        return this.buffer;
    }
}
