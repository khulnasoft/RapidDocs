import { mapKeys } from "lodash-es";

import { entries } from "@khulnasoft/core-utils";
import { PackageMarkerFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath, join } from "@khulnasoft/path-utils";

import { RapiddocsDefinition } from "../AbstractAPIWorkspace";
import { ParsedRapiddocsFile } from "../RapiddocsFile";

export declare namespace getAllPackageMarkers {
    interface Opts {
        defaultURL?: string;
    }
}

export function getAllPackageMarkers(
    definition: RapiddocsDefinition,
    opts: getAllPackageMarkers.Opts = {}
): Record<RelativeFilePath, ParsedRapiddocsFile<PackageMarkerFileSchema>> {
    return {
        ...Object.fromEntries(
            entries(definition.packageMarkers).map(([path, file]) => {
                return [path, { ...file, defaultUrl: opts.defaultURL }];
            })
        ),
        ...entries(definition.importedDefinitions).reduce((acc, [pathToImportedDefinition, definition]) => {
            return {
                ...acc,
                ...mapKeys(getAllPackageMarkers(definition.definition, { defaultURL: definition.url }), (_file, path) =>
                    join(pathToImportedDefinition, RelativeFilePath.of(path))
                )
            };
        }, {})
    };
}
