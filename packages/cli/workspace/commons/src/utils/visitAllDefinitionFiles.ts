import { RAPIDDOCS_PACKAGE_MARKER_FILENAME } from "@khulnasoft/configuration";
import { entries } from "@khulnasoft/core-utils";
import { DefinitionFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/path-utils";
import { basename } from "@khulnasoft/path-utils";

import { RapiddocsWorkspace } from "../RapiddocsWorkspace";
import { getAllDefinitionFiles } from "./getAllDefinitionFiles";

export function visitAllDefinitionFiles(
    workspace: RapiddocsWorkspace,
    visitor: (
        filepath: RelativeFilePath,
        definitionFile: DefinitionFileSchema,
        metadata: { isPackageMarker: boolean; defaultUrl: string | undefined }
    ) => void
): void {
    for (const [relativeFilepath, file] of entries(getAllDefinitionFiles(workspace.definition))) {
        visitor(relativeFilepath, file.contents, {
            isPackageMarker: basename(relativeFilepath) === RAPIDDOCS_PACKAGE_MARKER_FILENAME,
            defaultUrl: file.defaultUrl
        });
    }
}
