import { Zurg } from "@rapiddocs-typescript/commons";
import { SdkContext } from "@rapiddocs-typescript/contexts";

export interface GeneratedEndpointTypeSchema {
    writeSchemaToFile: (context: SdkContext) => void;
    getReferenceToZurgSchema: (context: SdkContext) => Zurg.Schema;
}
