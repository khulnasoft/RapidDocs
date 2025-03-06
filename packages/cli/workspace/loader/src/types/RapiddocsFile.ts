import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/fs-utils";

export interface RapiddocsFile {
    relativeFilepath: RelativeFilePath;
    absoluteFilepath: AbsoluteFilePath;
    fileContents: string;
}

export interface ParsedRapiddocsFile<Schema> {
    rawContents: string;
    contents: Schema;
    defaultUrl: string | undefined;
}
