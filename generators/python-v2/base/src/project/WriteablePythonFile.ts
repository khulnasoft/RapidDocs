import { File } from "@khulnasoft/base-generator";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/fs-utils";
import { python } from "@khulnasoft/python-ast";

export declare namespace WriteablePythonFile {
    interface Args {
        filename: string;
        /* Directory of the filepath */
        directory: RelativeFilePath;

        contents: python.PythonFile;
    }
}

export class WriteablePythonFile extends File {
    constructor({ filename, directory, contents }: WriteablePythonFile.Args) {
        super(`${filename}.py`, directory, contents.toString());
    }

    public async tryWrite(directoryPrefix: AbsoluteFilePath): Promise<void> {
        await this.write(directoryPrefix);
    }
}
