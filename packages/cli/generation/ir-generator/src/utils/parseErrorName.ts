import { DeclaredErrorName } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../RapiddocsFileContext";
import { IdGenerator } from "../IdGenerator";
import { convertToRapiddocsFilepath } from "./convertToRapiddocsFilepath";
import { parseReferenceToTypeName } from "./parseReferenceToTypeName";

export function parseErrorName({ errorName, file }: { errorName: string; file: RapiddocsFileContext }): DeclaredErrorName {
    const reference = parseReferenceToTypeName({
        reference: errorName,
        referencedIn: file.relativeFilepath,
        imports: file.imports
    });
    if (reference == null) {
        throw new Error("Failed to locate error " + errorName);
    }

    const nameWithoutId = {
        name: file.casingsGenerator.generateName(reference.typeName),
        rapiddocsFilepath: convertToRapiddocsFilepath({
            relativeFilepath: reference.relativeFilepath,
            casingsGenerator: file.casingsGenerator
        })
    };

    return {
        ...nameWithoutId,
        errorId: IdGenerator.generateErrorId(nameWithoutId)
    };
}
