import { writeFile } from "fs/promises";

import { RAPIDDOCS_DIRECTORY, PROJECT_CONFIG_FILENAME } from "@khulnasoft/configuration";
import { RapiddocsDocsBuilderImpl } from "@khulnasoft/docs-importer-commons";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { MintlifyImporter } from "./MintlifyImporter";

interface RunMintlifyMigrationParams {
    absolutePathToMintJson: AbsoluteFilePath;
    outputPath: AbsoluteFilePath;
    taskContext: TaskContext;
    versionOfCli: string;
    organization: string;
}

export async function runMintlifyMigration({
    absolutePathToMintJson,
    outputPath,
    taskContext,
    versionOfCli,
    organization
}: RunMintlifyMigrationParams): Promise<void> {
    const mintlifyImporter = new MintlifyImporter({
        context: taskContext
    });

    const builder = new RapiddocsDocsBuilderImpl();

    await mintlifyImporter.import({
        args: { absolutePathToMintJson },
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
