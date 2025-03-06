import { rmdir, writeFile } from "fs/promises";
import yaml from "js-yaml";

import { AbsoluteFilePath, moveFolder } from "@khulnasoft/fs-utils";

import {
    convertLegacyGeneratorsConfiguration,
    getAbsolutePathToGeneratorsConfiguration,
    loadRawGeneratorsConfiguration
} from "./generators-configuration";

/**
 * rapiddocs/  <------ path to rapiddocs directory
 *   api/ <------ path to workspace
 *    definition/...
 *    generators.yml
 *
 * This function moves everything from the workspace directory into the rapiddocs directory.
 */
export async function migrateOnlySingleAPI({
    absolutePathToRapiddocsDirectory,
    absolutePathToWorkspace
}: {
    absolutePathToRapiddocsDirectory: AbsoluteFilePath;
    absolutePathToWorkspace: AbsoluteFilePath;
}): Promise<void> {
    await migrateAndWriteGeneratorsYml({ absolutePathToWorkspace });
    await moveFolder({ src: absolutePathToWorkspace, dest: absolutePathToRapiddocsDirectory });
    await rmdir(absolutePathToWorkspace, { recursive: true });
}

async function migrateAndWriteGeneratorsYml({
    absolutePathToWorkspace
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
}): Promise<void> {
    const generatorsConfiguration = await loadRawGeneratorsConfiguration({ absolutePathToWorkspace });
    if (generatorsConfiguration == null) {
        return;
    }
    const absolutePathToGeneratorsConfiguration = getAbsolutePathToGeneratorsConfiguration({ absolutePathToWorkspace });
    const convertedResponse = convertLegacyGeneratorsConfiguration({
        generatorsConfiguration,
        pathModificationStrategy: "MoveUp"
    });
    await writeFile(absolutePathToGeneratorsConfiguration, yaml.dump(convertedResponse.value));
}
