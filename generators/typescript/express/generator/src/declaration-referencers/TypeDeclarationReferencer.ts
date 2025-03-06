import { ExportedFilePath, Reference, getExportedDirectoriesForRapiddocsFilepath } from "@rapiddocs-typescript/commons";

import { RelativeFilePath } from "@khulnasoft/fs-utils";

import { DeclaredTypeName } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { AbstractDeclarationReferencer } from "./AbstractDeclarationReferencer";
import { DeclarationReferencer } from "./DeclarationReferencer";

export const TYPES_DIRECTORY_NAME = "types";

export class TypeDeclarationReferencer extends AbstractDeclarationReferencer<DeclaredTypeName> {
    public getExportedFilepath(typeName: DeclaredTypeName): ExportedFilePath {
        return {
            directories: [
                ...this.containingDirectory,
                ...getExportedDirectoriesForRapiddocsFilepath({
                    rapiddocsFilepath: typeName.rapiddocsFilepath,
                    subExports: {
                        [RelativeFilePath.of(TYPES_DIRECTORY_NAME)]: {
                            exportAll: true
                        }
                    }
                }),
                {
                    nameOnDisk: TYPES_DIRECTORY_NAME,
                    exportDeclaration: { exportAll: true }
                }
            ],
            file: {
                nameOnDisk: this.getFilename(typeName),
                exportDeclaration: { exportAll: true }
            }
        };
    }

    public getFilename(typeName: DeclaredTypeName): string {
        return `${this.getExportedName(typeName)}.ts`;
    }

    public getExportedName(typeName: DeclaredTypeName): string {
        return typeName.name.pascalCase.safeName;
    }

    public getReferenceToType(args: DeclarationReferencer.getReferenceTo.Options<DeclaredTypeName>): Reference {
        return this.getReferenceTo(this.getExportedName(args.name), args);
    }
}
