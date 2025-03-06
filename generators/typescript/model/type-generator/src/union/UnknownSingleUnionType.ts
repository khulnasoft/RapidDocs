import { BaseContext } from "@rapiddocs-typescript/contexts";
import { AbstractUnknownSingleUnionType } from "@rapiddocs-typescript/union-generator";

export class UnknownSingleUnionType extends AbstractUnknownSingleUnionType<BaseContext> {
    public getDocs(): string | null | undefined {
        return undefined;
    }
}
