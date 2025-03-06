import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { FileGenerator, PhpFile } from "@khulnasoft/php-base";

import { MultipleBaseUrlsEnvironments } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { SdkCustomConfigSchema } from "../SdkCustomConfig";
import { SdkGeneratorContext } from "../SdkGeneratorContext";

export declare namespace MultiUrlEnvironmentGenerator {
    interface Args {
        context: SdkGeneratorContext;
        multiUrlEnvironments: MultipleBaseUrlsEnvironments;
    }
}

export class MultiUrlEnvironmentGenerator extends FileGenerator<PhpFile, SdkCustomConfigSchema, SdkGeneratorContext> {
    private multiUrlEnvironments: MultipleBaseUrlsEnvironments;

    constructor({ context, multiUrlEnvironments }: MultiUrlEnvironmentGenerator.Args) {
        super(context);
        this.multiUrlEnvironments = multiUrlEnvironments;
    }

    public doGenerate(): PhpFile {
        throw new Error("Multiple environment URLs are not supported yet");
    }

    protected getFilepath(): RelativeFilePath {
        throw new Error("Multiple environment URLs are not supported yet");
    }
}
