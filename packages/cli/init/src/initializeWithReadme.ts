import { AbsoluteFilePath, cwd, isURL } from "@khulnasoft/fs-utils";
import { runReadmeMigration } from "@khulnasoft/readme-importer";
import { TaskContext } from "@khulnasoft/task-context";

export const initializeWithReadme = async ({
    readmeUrl,
    organization,
    taskContext,
    versionOfCli
}: {
    readmeUrl?: string;
    organization: string;
    taskContext: TaskContext;
    versionOfCli: string;
}): Promise<void> => {
    if (!readmeUrl || !isURL(readmeUrl)) {
        taskContext.failAndThrow("Provide a URL to a readme-generated site");
        return;
    }

    const outputPath = AbsoluteFilePath.of(cwd());

    await runReadmeMigration({
        readmeUrl,
        outputPath,
        taskContext,
        versionOfCli,
        organization
    });
};
