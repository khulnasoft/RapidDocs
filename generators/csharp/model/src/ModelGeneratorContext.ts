import { AbstractCsharpGeneratorContext, AsIsFiles } from "@khulnasoft/csharp-codegen";
import { RelativeFilePath } from "@khulnasoft/fs-utils";

import { RapiddocsFilepath, TypeId, WellKnownProtobufType } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { ModelCustomConfigSchema } from "./ModelCustomConfig";

export class ModelGeneratorContext extends AbstractCsharpGeneratorContext<ModelCustomConfigSchema> {
    /**
     * __package__.yml types are stored at the top level
     * __{{file}}__.yml types are stored in a directory with the same name as the file
     *
     * @param typeId The type id of the type declaration
     * @returns
     */
    public getDirectoryForTypeId(typeId: TypeId): RelativeFilePath {
        const typeDeclaration = this.getTypeDeclarationOrThrow(typeId);
        return RelativeFilePath.of(
            [...typeDeclaration.name.rapiddocsFilepath.allParts.map((path) => path.pascalCase.safeName)].join("/")
        );
    }

    public getNamespaceForTypeId(typeId: TypeId): string {
        const typeDeclaration = this.getTypeDeclarationOrThrow(typeId);
        return [
            this.getNamespace(),
            ...typeDeclaration.name.rapiddocsFilepath.packagePath.map((path) => path.pascalCase.safeName)
        ].join(".");
    }

    public getRawAsIsFiles(): string[] {
        return [AsIsFiles.EditorConfig, AsIsFiles.GitIgnore];
    }

    public getCoreAsIsFiles(): string[] {
        const files = [
            AsIsFiles.Constants,
            AsIsFiles.Json.CollectionItemSerializer,
            AsIsFiles.Json.DateOnlyConverter,
            AsIsFiles.Json.DateTimeSerializer,
            AsIsFiles.Json.JsonAccessAttribute,
            AsIsFiles.Json.JsonConfiguration,
            AsIsFiles.Json.OneOfSerializer
        ];
        if (this.customConfig["experimental-enable-forward-compatible-enums"] ?? false) {
            files.push(AsIsFiles.Json.StringEnumSerializer);
            files.push(AsIsFiles.StringEnum);
            files.push(AsIsFiles.StringEnumExtensions);
        } else {
            files.push(AsIsFiles.Json.EnumSerializer);
        }

        const resolvedProtoAnyType = this.protobufResolver.resolveWellKnownProtobufType(WellKnownProtobufType.any());
        if (resolvedProtoAnyType != null) {
            files.push(AsIsFiles.ProtoAnyMapper);
        }
        return files;
    }

    public getCoreTestAsIsFiles(): string[] {
        const files = [
            AsIsFiles.Test.Json.DateOnlyJsonTests,
            AsIsFiles.Test.Json.DateTimeJsonTests,
            AsIsFiles.Test.Json.JsonAccessAttributeTests,
            AsIsFiles.Test.Json.OneOfSerializerTests
        ];
        if (this.customConfig["experimental-enable-forward-compatible-enums"] ?? false) {
            files.push(AsIsFiles.Test.Json.StringEnumSerializerTests);
        } else {
            files.push(AsIsFiles.Test.Json.EnumSerializerTests);
        }

        return files;
    }

    public getPublicCoreAsIsFiles(): string[] {
        return [];
    }

    public getPublicCoreTestAsIsFiles(): string[] {
        return [];
    }

    public getAsIsTestUtils(): string[] {
        return [];
    }

    public getExtraDependencies(): Record<string, string> {
        return {};
    }

    override getChildNamespaceSegments(rapiddocsFilepath: RapiddocsFilepath): string[] {
        return rapiddocsFilepath.packagePath.map((segmentName) => segmentName.pascalCase.safeName);
    }
}
