import { File } from "@khulnasoft/base-generator";
import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { BasePhpCustomConfigSchema } from "@khulnasoft/php-codegen";

import { AbstractPhpGeneratorContext } from "./context/AbstractPhpGeneratorContext";

export abstract class FileGenerator<
    GeneratedFile extends File,
    CustomConfig extends BasePhpCustomConfigSchema,
    Context extends AbstractPhpGeneratorContext<CustomConfig>
> {
    constructor(protected readonly context: Context) {}

    public generate(): GeneratedFile {
        this.context.logger.debug(`Generating ${this.getFilepath()}`);
        return this.doGenerate();
    }

    protected abstract doGenerate(): GeneratedFile;

    protected abstract getFilepath(): RelativeFilePath;
}
