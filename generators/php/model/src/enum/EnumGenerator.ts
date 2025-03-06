import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { FileGenerator, PhpFile } from "@khulnasoft/php-base";
import { php } from "@khulnasoft/php-codegen";

import { EnumTypeDeclaration, TypeDeclaration } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { ModelCustomConfigSchema } from "../ModelCustomConfig";
import { ModelGeneratorContext } from "../ModelGeneratorContext";

export class EnumGenerator extends FileGenerator<PhpFile, ModelCustomConfigSchema, ModelGeneratorContext> {
    private readonly classReference: php.ClassReference;

    constructor(
        context: ModelGeneratorContext,
        private readonly typeDeclaration: TypeDeclaration,
        private readonly enumDeclaration: EnumTypeDeclaration
    ) {
        super(context);
        this.classReference = this.context.phpTypeMapper.convertToClassReference(this.typeDeclaration.name);
    }

    protected doGenerate(): PhpFile {
        const enum_ = php.enum_({
            ...this.classReference,
            backing: "string"
        });
        this.enumDeclaration.values.forEach((member) =>
            enum_.addMember({ name: member.name.name.pascalCase.safeName, value: member.name.wireValue })
        );
        return new PhpFile({
            clazz: enum_,
            rootNamespace: this.context.getRootNamespace(),
            directory: this.context.getLocationForTypeId(this.typeDeclaration.name.typeId).directory,
            customConfig: this.context.customConfig
        });
    }

    protected getFilepath(): RelativeFilePath {
        return this.context.getLocationForTypeId(this.typeDeclaration.name.typeId).directory;
    }
}
