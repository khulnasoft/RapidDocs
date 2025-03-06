import { Zurg } from "@rapiddocs-typescript/commons";
import { SdkContext } from "@rapiddocs-typescript/contexts";
import { ts } from "ts-morph";

export interface GeneratedEndpointErrorSchema {
    writeToFile(context: SdkContext): void;
    getReferenceToRawShape(context: SdkContext): ts.TypeNode;
    getReferenceToZurgSchema(context: SdkContext): Zurg.Schema;
}
