import { DefinitionFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { RapiddocsDefinition } from "../AbstractAPIWorkspace";
import { ParsedRapiddocsFile } from "../RapiddocsFile";
import { getAllNamedDefinitionFiles } from "./getAllNamedDefinitionFiles";
import { getAllPackageMarkers } from "./getAllPackageMarkers";

export function getAllDefinitionFiles(
    definition: RapiddocsDefinition
): Record<RelativeFilePath, ParsedRapiddocsFile<DefinitionFileSchema>> {
    return {
        ...getAllPackageMarkers(definition),
        ...getAllNamedDefinitionFiles(definition)
    };
}
