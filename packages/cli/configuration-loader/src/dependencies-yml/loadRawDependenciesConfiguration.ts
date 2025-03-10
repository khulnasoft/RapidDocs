import { readFile } from "fs/promises";
import yaml from "js-yaml";

import { DEPENDENCIES_CONFIGURATION_FILENAME } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { validateSchema } from "../commons/validateSchema";
import { DependenciesConfigurationSchema } from "./schemas/DependenciesConfigurationSchema";

export async function loadRawDependenciesConfiguration({
    absolutePathToWorkspace,
    context
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
    context: TaskContext;
}): Promise<DependenciesConfigurationSchema | undefined> {
    const absolutePathToDependenciesConfiguration = join(
        absolutePathToWorkspace,
        RelativeFilePath.of(DEPENDENCIES_CONFIGURATION_FILENAME)
    );

    if (!(await doesPathExist(absolutePathToDependenciesConfiguration))) {
        return undefined;
    }

    const contentsStr = await readFile(absolutePathToDependenciesConfiguration);
    const contentsParsed = yaml.load(contentsStr.toString());
    return await validateSchema({
        schema: DependenciesConfigurationSchema,
        value: contentsParsed,
        context,
        filepathBeingParsed: absolutePathToDependenciesConfiguration
    });
}
