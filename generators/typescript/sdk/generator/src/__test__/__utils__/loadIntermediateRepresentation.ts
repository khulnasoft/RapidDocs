import { readFile } from "fs/promises";

import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";
import * as IrSerialization from "@rapiddocs-rapiddocs/ir-sdk/serialization";

export async function loadIntermediateRepresentation(pathToFile: string): Promise<IntermediateRepresentation> {
    const irString = (await readFile(pathToFile)).toString();
    const irJson = JSON.parse(irString);
    return IrSerialization.IntermediateRepresentation.parseOrThrow(irJson, {
        unrecognizedObjectKeys: "passthrough"
    });
}
