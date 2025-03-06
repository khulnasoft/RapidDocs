import { writeFile } from "fs/promises";

import { RAPIDDOCS_DIRECTORY, PROJECT_CONFIG_FILENAME } from "@khulnasoft/configuration";
import { RapiddocsDocsBuilderImpl } from "@khulnasoft/docs-importer-commons";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { ReadmeImporter } from "./ReadmeImporter";

interface RunReadmeMigrationParams {
    readmeUrl: string;
    outputPath: AbsoluteFilePath;
    taskContext: TaskContext;
    versionOfCli: string;
    organization: string;
}

export async function runReadmeMigration({
    readmeUrl,
    outputPath,
    taskContext,
    versionOfCli,
    organization
}: RunReadmeMigrationParams): Promise<void> {
    const readmeImporter = new ReadmeImporter({
        context: taskContext
    });

    const builder = new RapiddocsDocsBuilderImpl();

    await readmeImporter.import({
        args: { readmeUrl, organization },
        builder
    });

    await builder.build({ outputDirectory: outputPath });

    await writeFile(
        join(
            AbsoluteFilePath.of(outputPath),
            RelativeFilePath.of(RAPIDDOCS_DIRECTORY),
            RelativeFilePath.of(PROJECT_CONFIG_FILENAME)
        ),
        JSON.stringify(
            {
                version: versionOfCli,
                organization
            },
            undefined,
            4
        )
    );
}
