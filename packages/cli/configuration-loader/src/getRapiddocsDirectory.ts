import { findUp } from "find-up";

import { RAPIDDOCS_DIRECTORY, PROJECT_CONFIG_FILENAME } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";

export async function getRapiddocsDirectory(nameOverride?: string): Promise<AbsoluteFilePath | undefined> {
    const rapiddocsDirectoryStr = await findUp(nameOverride ?? RAPIDDOCS_DIRECTORY, { type: "directory" });
    if (rapiddocsDirectoryStr == null) {
        return undefined;
    }
    const absolutePathToRapiddocsDirectory = AbsoluteFilePath.of(rapiddocsDirectoryStr);

    if (await doesPathExist(join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(PROJECT_CONFIG_FILENAME)))) {
        return absolutePathToRapiddocsDirectory;
    } else {
        return undefined;
    }
}
