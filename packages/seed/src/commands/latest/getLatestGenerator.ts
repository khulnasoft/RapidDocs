import semver from "semver";

import { RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { GeneratorWorkspace, loadCliWorkspace } from "../../loadGeneratorWorkspaces";
import { parseGeneratorReleasesFile } from "../../utils/convertVersionsFileToReleases";

export async function getLatestGenerator({
    context,
    generator
}: {
    context: TaskContext;
    generator: GeneratorWorkspace;
}): Promise<string | undefined> {
    const generatorConfig = generator.workspaceConfig;
    let latestVersion: string | undefined;
    if (generatorConfig.changelogLocation) {
        const absolutePathToChangelogLocation = join(
            generator.absolutePathToWorkspace,
            RelativeFilePath.of(generatorConfig.changelogLocation)
        );
        if (!(await doesPathExist(absolutePathToChangelogLocation))) {
            context.logger.error(
                `Specified changelog location (${absolutePathToChangelogLocation}) not found, continuing without getting the latest version for generator ${generator.workspaceName}.`
            );
            return undefined;
        }

        await parseGeneratorReleasesFile({
            generatorId: generator.workspaceName,
            changelogPath: absolutePathToChangelogLocation,
            context,
            action: async (release) => {
                const maybeNewSemver = semver.parse(release.version);
                const maybeCurrentSemver = semver.parse(latestVersion);
                if (
                    latestVersion == null ||
                    (maybeCurrentSemver != null &&
                        maybeNewSemver != null &&
                        maybeNewSemver.compare(maybeCurrentSemver) > 0)
                ) {
                    latestVersion = release.version;
                }
            }
        });
    }

    return latestVersion;
}
