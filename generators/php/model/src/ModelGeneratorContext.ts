import { AbstractPhpGeneratorContext, AsIsFiles, FileLocation } from "@khulnasoft/php-base";

import { ModelCustomConfigSchema } from "./ModelCustomConfig";

export class ModelGeneratorContext extends AbstractPhpGeneratorContext<ModelCustomConfigSchema> {
    public getRawAsIsFiles(): string[] {
        return [AsIsFiles.GitIgnore, AsIsFiles.PhpStanNeon, AsIsFiles.PhpUnitXml];
    }

    public getLocationForTypeId(typeId: string): FileLocation {
        const typeDeclaration = this.getTypeDeclarationOrThrow(typeId);
        return this.getFileLocation(typeDeclaration.name.rapiddocsFilepath);
    }

    public getCoreAsIsFiles(): string[] {
        return [...this.getCoreSerializationAsIsFiles()];
    }

    public getCoreTestAsIsFiles(): string[] {
        return [...this.getCoreSerializationTestAsIsFiles()];
    }

    public getUtilsAsIsFiles(): string[] {
        return [];
    }
}
