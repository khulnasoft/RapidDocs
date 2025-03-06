import { mapValues } from "lodash-es";

import { CasingsGenerator } from "@khulnasoft/casings-generator";
import { DefinitionFileSchema, RawSchemas, RootApiFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RapiddocsFilepath, TypeReference } from "@khulnasoft/ir-sdk";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { convertToRapiddocsFilepath } from "./utils/convertToRapiddocsFilepath";
import { parseInlineType } from "./utils/parseInlineType";

/**
 * here is a description
 */
export interface RapiddocsFileContext {
    defaultUrl: string | undefined;
    relativeFilepath: RelativeFilePath;
    rapiddocsFilepath: RapiddocsFilepath;
    imports: Record<string, RelativeFilePath>;
    definitionFile: DefinitionFileSchema;
    parseTypeReference: (
        type: string | { type: string; inline?: boolean; default?: unknown; validation?: RawSchemas.ValidationSchema }
    ) => TypeReference;
    casingsGenerator: CasingsGenerator;
    rootApiFile: RootApiFileSchema;
}

export function constructRootApiFileContext({
    casingsGenerator,
    rootApiFile
}: {
    casingsGenerator: CasingsGenerator;
    rootApiFile: RootApiFileSchema;
}): RapiddocsFileContext {
    return constructRapiddocsFileContext({
        relativeFilepath: RelativeFilePath.of("."),
        definitionFile: {
            imports: rootApiFile.imports
        },
        casingsGenerator,
        rootApiFile
    });
}

export function constructRapiddocsFileContext({
    defaultUrl,
    relativeFilepath,
    definitionFile,
    casingsGenerator,
    rootApiFile
}: {
    defaultUrl?: string;
    relativeFilepath: RelativeFilePath;
    definitionFile: DefinitionFileSchema;
    casingsGenerator: CasingsGenerator;
    rootApiFile: RootApiFileSchema;
}): RapiddocsFileContext {
    const file: RapiddocsFileContext = {
        defaultUrl,
        relativeFilepath,
        rapiddocsFilepath: convertToRapiddocsFilepath({ relativeFilepath, casingsGenerator }),
        imports: mapValues(definitionFile.imports ?? {}, RelativeFilePath.of),
        definitionFile,
        parseTypeReference: (type) => {
            if (typeof type === "string") {
                return parseInlineType({ type, _default: undefined, validation: undefined, file });
            }
            return parseInlineType({
                type: type.type,
                _default: type.default,
                validation: type.validation,
                file
            });
        },
        casingsGenerator,
        rootApiFile
    };
    return file;
}
