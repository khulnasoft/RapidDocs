import { findUp } from "find-up";
import { glob } from "glob";

import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

const RAPIDDOCS_DIRECTORY = "rapiddocs";

export async function getAllYamlFiles(context: TaskContext): Promise<AbsoluteFilePath[]> {
    const rapiddocsDirectory = await getRapiddocsDirectory();
    const alphasort = (a: string, b: string) => a.localeCompare(b, "en");
    if (rapiddocsDirectory == null) {
        context.failAndThrow(`Directory "${RAPIDDOCS_DIRECTORY}" not found.`);
    }
    const filepaths = await glob("*/definition/**/*.yml", {
        cwd: rapiddocsDirectory,
        absolute: true
    });
    return filepaths.sort(alphasort).map(AbsoluteFilePath.of);
}

async function getRapiddocsDirectory(): Promise<AbsoluteFilePath | undefined> {
    const rapiddocsDirectoryStr = await findUp(RAPIDDOCS_DIRECTORY, { type: "directory" });
    if (rapiddocsDirectoryStr == null) {
        return undefined;
    }
    return AbsoluteFilePath.of(rapiddocsDirectoryStr);
}
