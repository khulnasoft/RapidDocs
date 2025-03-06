import { homedir } from "os";

import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

const TOKEN_FILENAME = "token";
const LOCAL_STORAGE_FOLDER = process.env.LOCAL_STORAGE_FOLDER ?? ".rapiddocs";

export function getPathToTokenFile(): AbsoluteFilePath {
    return join(
        AbsoluteFilePath.of(homedir()),
        RelativeFilePath.of(LOCAL_STORAGE_FOLDER),
        RelativeFilePath.of(TOKEN_FILENAME)
    );
}
