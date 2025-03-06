import { AbsoluteFilePath } from "@khulnasoft/path-utils";

export interface APIChangelog {
    files: ChangelogFile[];
}

export interface ChangelogFile {
    absoluteFilepath: AbsoluteFilePath;
    contents: string;
}
