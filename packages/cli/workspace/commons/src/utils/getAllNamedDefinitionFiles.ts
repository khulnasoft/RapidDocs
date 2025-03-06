import { mapKeys } from "lodash-es";

import { entries } from "@khulnasoft/core-utils";
import { DefinitionFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath, join } from "@khulnasoft/path-utils";

import { RapiddocsDefinition } from "../AbstractAPIWorkspace";
import { ParsedRapiddocsFile } from "../RapiddocsFile";

export declare namespace getAllNamedDefinitionFiles {
    interface Opts {
        defaultURL?: string;
    }
}

export function getAllNamedDefinitionFiles(
    definition: RapiddocsDefinition,
    opts: getAllNamedDefinitionFiles.Opts = {}
): Record<RelativeFilePath, ParsedRapiddocsFile<DefinitionFileSchema>> {
    return {
        ...Object.fromEntries(
            entries(definition.namedDefinitionFiles).map(([path, file]) => {
                return [path, { ...file, defaultUrl: opts.defaultURL }];
            })
        ),
        ...entries(definition.importedDefinitions).reduce((acc, [pathToImportedDefinition, definition]) => {
            return {
                ...acc,
                ...mapKeys(
                    getAllNamedDefinitionFiles(definition.definition, { defaultURL: definition.url }),
                    (_file, path) => join(pathToImportedDefinition, RelativeFilePath.of(path))
                )
            };
        }, {})
    };
}
