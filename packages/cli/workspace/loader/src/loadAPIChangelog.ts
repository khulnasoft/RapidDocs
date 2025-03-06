import { APIChangelog } from "@khulnasoft/api-workspace-commons";
import { CHANGELOG_DIRECTORY } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";

import { listRapiddocsFiles } from "./listRapiddocsFiles";

export async function loadAPIChangelog({
    absolutePathToWorkspace
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
}): Promise<Promise<APIChangelog | undefined>> {
    const absolutePathToChangelogDirectory = join(absolutePathToWorkspace, RelativeFilePath.of(CHANGELOG_DIRECTORY));
    const changelogDirectoryExists = await doesPathExist(absolutePathToChangelogDirectory);
    if (!changelogDirectoryExists) {
        return undefined;
    }

    const mdFiles = await listRapiddocsFiles(absolutePathToChangelogDirectory, "{md,mdx}");
    return {
        files: await Promise.all(
            mdFiles.map((file) => {
                return {
                    absoluteFilepath: file.absoluteFilepath,
                    contents: file.fileContents
                };
            })
        )
    };
}
