import path from "path";

import { File } from "@khulnasoft/base-generator";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/fs-utils";
import { BasePhpCustomConfigSchema, php } from "@khulnasoft/php-codegen";

import { RapiddocsFilepath } from "@rapiddocs-rapiddocs/ir-sdk/api";

export type Namespace = string;

export declare namespace PhpFile {
    interface Args {
        /* The class to be written to the PHP File */
        clazz: php.Class | php.DataClass | php.Trait | php.Enum;
        /* Directory of the filepath */
        directory: RelativeFilePath;
        /* The root namespace of the project. Can be pulled directly from context. */
        rootNamespace: string;
        /* Custom generator config */
        customConfig: BasePhpCustomConfigSchema;
    }
}

export class PhpFile extends File {
    constructor({ clazz, directory, rootNamespace, customConfig }: PhpFile.Args) {
        super(
            `${clazz.name}.php`,
            directory,
            phpFileContent({
                clazz,
                rootNamespace,
                customConfig
            })
        );
    }

    public async tryWrite(directoryPrefix: AbsoluteFilePath): Promise<void> {
        await this.write(directoryPrefix);
    }

    public static getFilePathFromRapiddocsFilePath(rapiddocsFilePath: RapiddocsFilepath): RelativeFilePath {
        return RelativeFilePath.of(path.join(...rapiddocsFilePath.allParts.map((part) => part.pascalCase.safeName)));
    }
}

function phpFileContent({
    clazz,
    rootNamespace,
    customConfig
}: {
    clazz: php.Class | php.DataClass | php.Trait | php.Enum;
    rootNamespace: string;
    customConfig: BasePhpCustomConfigSchema;
}): string {
    return (
        "<?php\n\n" +
        clazz.toString({
            namespace: clazz.namespace,
            rootNamespace,
            customConfig
        })
    );
}
