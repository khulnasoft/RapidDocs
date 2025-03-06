import { entries } from "@khulnasoft/core-utils";
import { PackageMarkerFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { RapiddocsWorkspace } from "../RapiddocsWorkspace";
import { getAllPackageMarkers } from "./getAllPackageMarkers";

export function visitAllPackageMarkers(
    workspace: RapiddocsWorkspace,
    visitor: (filepath: RelativeFilePath, packageMarker: PackageMarkerFileSchema) => void
): void {
    for (const [relativeFilepath, file] of entries(getAllPackageMarkers(workspace.definition))) {
        visitor(relativeFilepath, file.contents);
    }
}
