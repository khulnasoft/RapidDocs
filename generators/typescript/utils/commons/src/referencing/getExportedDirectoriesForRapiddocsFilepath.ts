import { RelativeFilePath } from "@khulnasoft/fs-utils";

import { RapiddocsFilepath, Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { ExportDeclaration } from "../exports-manager";
import { ExportedDirectory } from "../exports-manager/ExportedFilePath";

export function getExportedDirectoriesForRapiddocsFilepath({
    rapiddocsFilepath,
    subExports
}: {
    rapiddocsFilepath: RapiddocsFilepath;
    subExports?: Record<RelativeFilePath, ExportDeclaration>;
}): ExportedDirectory[] {
    const directories = [
        ...rapiddocsFilepath.packagePath.flatMap((rapiddocsFilepathPart) =>
            getExportedDirectoriesForRapiddocsFilepathPart(rapiddocsFilepathPart)
        )
    ];
    if (rapiddocsFilepath.file != null) {
        directories.push(...getExportedDirectoriesForRapiddocsFilepathPart(rapiddocsFilepath.file, { subExports }));
    }
    return directories;
}

function getExportedDirectoriesForRapiddocsFilepathPart(
    rapiddocsFilepathPart: Name,
    { subExports }: { subExports?: Record<string, ExportDeclaration> } = {}
): ExportedDirectory[] {
    return [
        {
            nameOnDisk: "resources",
            exportDeclaration: { exportAll: true }
        },
        {
            nameOnDisk: rapiddocsFilepathPart.camelCase.unsafeName,
            exportDeclaration: { namespaceExport: rapiddocsFilepathPart.camelCase.safeName },
            subExports
        }
    ];
}
