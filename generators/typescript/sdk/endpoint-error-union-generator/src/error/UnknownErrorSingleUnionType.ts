import { SdkContext } from "@rapiddocs-typescript/contexts";
import { AbstractUnknownSingleUnionType } from "@rapiddocs-typescript/union-generator";

export class UnknownErrorSingleUnionType extends AbstractUnknownSingleUnionType<SdkContext> {
    public getDocs(): string | null | undefined {
        return undefined;
    }
}
