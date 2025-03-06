import { Zurg } from "@rapiddocs-typescript/commons";
import { ExpressContext } from "@rapiddocs-typescript/contexts";

export interface GeneratedEndpointTypeSchema {
    writeSchemaToFile: (context: ExpressContext) => void;
    getReferenceToZurgSchema: (context: ExpressContext) => Zurg.Schema;
}
