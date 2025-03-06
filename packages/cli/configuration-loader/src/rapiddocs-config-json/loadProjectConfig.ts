import { readFile } from "fs/promises";

import { PROJECT_CONFIG_FILENAME } from "@khulnasoft/configuration";
import { rapiddocsConfigJson } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { validateSchema } from "../commons/validateSchema";
import { ProjectConfigSchema } from "./schema/ProjectConfigSchema";

export async function loadProjectConfig({
    directory,
    context
}: {
    directory: AbsoluteFilePath;
    context: TaskContext;
}): Promise<rapiddocsConfigJson.ProjectConfig> {
    const pathToConfig = join(directory, RelativeFilePath.of(PROJECT_CONFIG_FILENAME));
    const projectConfigStr = await readFile(pathToConfig);
    const projectConfigParsed = JSON.parse(projectConfigStr.toString()) as unknown;
    const rawProjectConfig = await validateSchema({
        schema: ProjectConfigSchema,
        value: projectConfigParsed,
        context,
        filepathBeingParsed: pathToConfig
    });
    return {
        _absolutePath: pathToConfig,
        rawConfig: rawProjectConfig,
        organization: rawProjectConfig.organization,
        version: rawProjectConfig.version
    };
}
