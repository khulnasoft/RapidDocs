import { readFile } from "fs/promises";

import { AbsoluteFilePath, RelativeFilePath, listFiles, relative } from "@khulnasoft/fs-utils";

import { RapiddocsFile } from "./types/RapiddocsFile";

export async function listRapiddocsFiles(root: AbsoluteFilePath, extensionGlob: string): Promise<RapiddocsFile[]> {
    const files: RapiddocsFile[] = [];

    for (const absoluteFilepath of await listFiles(root, extensionGlob)) {
        files.push(
            await createRapiddocsFile({
                relativeFilepath: relative(root, absoluteFilepath),
                absoluteFilepath
            })
        );
    }

    return files;
}

async function createRapiddocsFile({
    relativeFilepath,
    absoluteFilepath
}: {
    relativeFilepath: RelativeFilePath;
    absoluteFilepath: AbsoluteFilePath;
}): Promise<RapiddocsFile> {
    return {
        relativeFilepath,
        absoluteFilepath,
        fileContents: (await readFile(absoluteFilepath)).toString()
    };
}
