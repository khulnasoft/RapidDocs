import { readFile } from "fs/promises";
import yaml from "js-yaml";

import { DOCS_CONFIGURATION_FILENAME, docsYml } from "@khulnasoft/configuration-loader";
import { validateAgainstJsonSchema } from "@khulnasoft/core-utils";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import * as DocsYmlJsonSchema from "./docs-yml.schema.json";
import { DocsWorkspace } from "./types/Workspace";

export async function loadDocsWorkspace({
    rapiddocsDirectory,
    context
}: {
    rapiddocsDirectory: AbsoluteFilePath;
    context: TaskContext;
}): Promise<DocsWorkspace | undefined> {
    const docsConfigurationFile = join(rapiddocsDirectory, RelativeFilePath.of(DOCS_CONFIGURATION_FILENAME));
    if (!(await doesPathExist(docsConfigurationFile))) {
        return undefined;
    }

    const docsConfiguration = await loadDocsConfiguration({
        absolutePathToDocsDefinition: rapiddocsDirectory,
        context
    });
    if (docsConfiguration != null) {
        return {
            type: "docs",
            absoluteFilePath: rapiddocsDirectory,
            config: docsConfiguration,
            workspaceName: undefined,
            absoluteFilepathToDocsConfig: join(rapiddocsDirectory, RelativeFilePath.of(DOCS_CONFIGURATION_FILENAME))
        };
    }
    return undefined;
}

export async function loadDocsConfiguration({
    absolutePathToDocsDefinition,
    context
}: {
    absolutePathToDocsDefinition: AbsoluteFilePath;
    context: TaskContext;
}): Promise<docsYml.RawSchemas.DocsConfiguration | undefined> {
    if (!(await doesPathExist(absolutePathToDocsDefinition))) {
        return undefined;
    }
    const absolutePathOfConfiguration = join(
        absolutePathToDocsDefinition,
        RelativeFilePath.of(DOCS_CONFIGURATION_FILENAME)
    );
    return await loadRawDocsConfiguration({
        absolutePathOfConfiguration,
        context
    });
}

export async function loadRawDocsConfiguration({
    absolutePathOfConfiguration,
    context
}: {
    absolutePathOfConfiguration: AbsoluteFilePath;
    context: TaskContext;
}): Promise<docsYml.RawSchemas.DocsConfiguration> {
    const contentsStr = await readFile(absolutePathOfConfiguration);
    const contentsJson = yaml.load(contentsStr.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = validateAgainstJsonSchema(contentsJson, DocsYmlJsonSchema as any);
    if (result.success) {
        return docsYml.RawSchemas.Serializer.DocsConfiguration.parseOrThrow(contentsJson);
    } else {
        throw new Error(`Failed to parse docs.yml because of ${result.error?.message ?? "Unknown error"}`);
    }
}
