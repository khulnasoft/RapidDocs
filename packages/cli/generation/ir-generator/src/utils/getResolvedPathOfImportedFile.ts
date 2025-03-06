import { RelativeFilePath, dirname, join } from "@khulnasoft/path-utils";

export function getResolvedPathOfImportedFile({
    referencedIn,
    importPath
}: {
    referencedIn: RelativeFilePath;
    importPath: RelativeFilePath;
}): RelativeFilePath {
    return join(dirname(referencedIn), importPath);
}
