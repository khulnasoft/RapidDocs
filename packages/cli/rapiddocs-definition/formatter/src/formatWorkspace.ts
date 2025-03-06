import chalk from "chalk";
import { writeFile } from "fs/promises";

import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { entries } from "@khulnasoft/core-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { formatDefinitionFile } from "./formatDefinitionFile";

export async function formatRapiddocsWorkspace({
    workspace,
    context,
    shouldFix
}: {
    workspace: RapiddocsWorkspace;
    context: TaskContext;
    shouldFix: boolean;
}): Promise<void> {
    for (const [relativeFilepath, file] of entries(workspace.definition.namedDefinitionFiles)) {
        const formatted = await formatDefinitionFile({
            fileContents: file.rawContents
        });
        if (formatted !== file.rawContents) {
            if (shouldFix) {
                await writeFile(file.absoluteFilePath, formatted);
                context.logger.info(chalk.green(`Formatted ${chalk.bold(relativeFilepath)}`));
            } else {
                context.logger.info(chalk.red(`Invalid formatting: ${chalk.bold(relativeFilepath)}`));
                context.failWithoutThrowing();
            }
        }
    }
}
