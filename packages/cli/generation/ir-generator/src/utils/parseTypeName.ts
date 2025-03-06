import { DeclaredTypeName } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../RapiddocsFileContext";
import { IdGenerator } from "../IdGenerator";
import { convertToRapiddocsFilepath } from "./convertToRapiddocsFilepath";
import { parseReferenceToTypeName } from "./parseReferenceToTypeName";

export function parseTypeName({ typeName, file }: { typeName: string; file: RapiddocsFileContext }): DeclaredTypeName {
    const reference = parseReferenceToTypeName({
        reference: typeName,
        referencedIn: file.relativeFilepath,
        imports: file.imports
    });
    if (reference == null) {
        throw new Error("Failed to locate type: " + typeName);
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
        typeId: IdGenerator.generateTypeId(nameWithoutId)
    };
}
