import { dependenciesYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { convertDependenciesConfiguration } from "./convertDependenciesConfiguration";
import { loadRawDependenciesConfiguration } from "./loadRawDependenciesConfiguration";

export async function loadDependenciesConfiguration({
    absolutePathToWorkspace,
    context
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
    context: TaskContext;
}): Promise<dependenciesYml.DependenciesConfiguration> {
    const rawDependenciesConfiguration = await loadRawDependenciesConfiguration({
        absolutePathToWorkspace,
        context
    });
    return convertDependenciesConfiguration({
        absolutePathToWorkspace,
        rawDependenciesConfiguration,
        context
    });
}
