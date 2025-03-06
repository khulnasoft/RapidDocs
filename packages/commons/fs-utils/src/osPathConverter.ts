import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { RelativeFilePath } from "./RelativeFilePath";

// For convenience, we re-export the convertToOsPath type for any caller
// that requires fs-utils.
export { convertToOsPath } from "@khulnasoft/path-utils";

export function convertToRapiddocsHostAbsoluteFilePath(path: AbsoluteFilePath): AbsoluteFilePath {
    // Don't use 'of' here, as it will use OS path, we want rapiddocs path
    return convertToRapiddocsHostPath(path) as AbsoluteFilePath;
}
export function convertToRapiddocsHostRelativeFilePath(path: RelativeFilePath): RelativeFilePath {
    // Don't use 'of' here, as it will use OS path, we want rapiddocs path
    return convertToRapiddocsHostPath(path) as RelativeFilePath;
}

function convertToRapiddocsHostPath(path: string): string {
    let unixPath = path;
    if (/^[a-zA-Z]:\\/.test(path)) {
        unixPath = path.substring(2);
    }

    return unixPath.replace(/\\/g, "/");
}
