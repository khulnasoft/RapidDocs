import { File } from "@khulnasoft/base-generator";
import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { AbstractGoGeneratorContext, BaseGoCustomConfigSchema } from "@khulnasoft/go-ast";

export abstract class FileGenerator<
    GeneratedFile extends File,
    CustomConfig extends BaseGoCustomConfigSchema,
    Context extends AbstractGoGeneratorContext<CustomConfig>
> {
    constructor(protected readonly context: Context) {}

    public generate(): GeneratedFile {
        this.context.logger.debug(`Generating ${this.getFilepath()}`);
        return this.doGenerate();
    }

    protected abstract doGenerate(): GeneratedFile;

    protected abstract getFilepath(): RelativeFilePath;
}
