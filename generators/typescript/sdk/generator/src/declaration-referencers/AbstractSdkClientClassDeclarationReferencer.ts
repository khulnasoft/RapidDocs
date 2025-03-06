import {
    ExportDeclaration,
    ExportedDirectory,
    PackageId,
    getExportedDirectoriesForRapiddocsFilepath
} from "@rapiddocs-typescript/commons";
import { PackageResolver } from "@rapiddocs-typescript/resolvers";

import { entries } from "@khulnasoft/core-utils";
import { RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { RapiddocsFilepath } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { AbstractDeclarationReferencer } from "./AbstractDeclarationReferencer";

const CLIENT_DIRECTORY = "client";

export declare namespace AbstractSdkClientClassDeclarationReferencer {
    export interface Init extends AbstractDeclarationReferencer.Init {
        packageResolver: PackageResolver;
    }
}

export abstract class AbstractSdkClientClassDeclarationReferencer<Name> extends AbstractDeclarationReferencer<Name> {
    protected packageResolver: PackageResolver;

    constructor({ packageResolver, ...superInit }: AbstractSdkClientClassDeclarationReferencer.Init) {
        super(superInit);
        this.packageResolver = packageResolver;
    }

    protected getExportedDirectory(
        name: Name,
        { subExports }: { subExports?: Record<RelativeFilePath, ExportDeclaration> } = {}
    ): ExportedDirectory[] {
        return [
            ...this.containingDirectory,
            ...getExportedDirectoriesForRapiddocsFilepath({
                rapiddocsFilepath: this.getRapiddocsFilepathFromName(name),
                subExports:
                    subExports != null
                        ? entries(subExports).reduce(
                              (acc, [pathToSubExport, exportDeclaration]) => ({
                                  ...acc,
                                  [join(RelativeFilePath.of(CLIENT_DIRECTORY), pathToSubExport)]: exportDeclaration
                              }),
                              {}
                          )
                        : undefined
            }),
            {
                nameOnDisk: CLIENT_DIRECTORY,
                exportDeclaration: { exportAll: true }
            }
        ];
    }

    private getRapiddocsFilepathFromName(name: Name): RapiddocsFilepath {
        return this.packageResolver.resolvePackage(this.getPackageIdFromName(name)).rapiddocsFilepath;
    }

    protected abstract getPackageIdFromName(name: Name): PackageId;
}
