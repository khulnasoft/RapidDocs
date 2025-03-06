import { CasingsGenerator } from "@khulnasoft/casings-generator";
import { RAPIDDOCS_PACKAGE_MARKER_FILENAME_NO_EXTENSION } from "@khulnasoft/configuration";
import { RapiddocsFilepath } from "@khulnasoft/ir-sdk";
import { RelativeFilePath, basename, dirname, sep } from "@khulnasoft/path-utils";

export function convertToRapiddocsFilepath({
    relativeFilepath,
    casingsGenerator
}: {
    relativeFilepath: RelativeFilePath;
    casingsGenerator: CasingsGenerator;
}): RapiddocsFilepath {
    const pathToPackage = dirname(relativeFilepath);
    const filename = basename(relativeFilepath, { stripExtension: true });

    const packagePath =
        pathToPackage === "." ? [] : pathToPackage.split(sep).map((part) => casingsGenerator.generateName(part));

    const file =
        filename !== RAPIDDOCS_PACKAGE_MARKER_FILENAME_NO_EXTENSION ? casingsGenerator.generateName(filename) : undefined;

    const allParts = [];
    allParts.push(...packagePath);
    if (file != null) {
        allParts.push(file);
    }

    return {
        allParts,
        packagePath,
        file
    };
}
