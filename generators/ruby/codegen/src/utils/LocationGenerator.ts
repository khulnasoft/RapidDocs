import { snakeCase } from "lodash-es";

import { DeclaredServiceName, DeclaredTypeName, RapiddocsFilepath } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { TYPES_DIRECTORY, TYPES_MODULE } from "./RubyConstants";

export class LocationGenerator {
    public rootModule: string;
    public shouldFlattenModules: boolean;
    private directoryPrefix: string;

    constructor(directoryPrefix: string, rootModule: string, shouldFlattenModules: boolean) {
        this.directoryPrefix = directoryPrefix;
        this.rootModule = rootModule;
        this.shouldFlattenModules = shouldFlattenModules;
    }

    public getLocationForTypeDeclaration(declaredTypeName: DeclaredTypeName): string {
        return [
            snakeCase(this.directoryPrefix),
            ...declaredTypeName.rapiddocsFilepath.allParts.map((pathPart) => pathPart.snakeCase.safeName),
            TYPES_DIRECTORY,
            declaredTypeName.name.snakeCase.safeName
        ].join("/");
    }

    public getLocationForServiceDeclaration(declaredServiceName: DeclaredServiceName): string {
        return [
            snakeCase(this.directoryPrefix),
            ...declaredServiceName.rapiddocsFilepath.packagePath.map((pathPart) => pathPart.snakeCase.safeName),
            declaredServiceName.rapiddocsFilepath.file?.snakeCase.safeName,
            "client"
        ]
            .filter((p) => p !== undefined)
            .join("/");
    }

    // Note: this assumes the file is in a directory of the same name
    public getLocationFromRapiddocsFilepath(rapiddocsFilepath: RapiddocsFilepath, fileName?: string): string {
        return [
            snakeCase(this.directoryPrefix),
            ...rapiddocsFilepath.allParts.map((pathPart) => pathPart.snakeCase.safeName),
            fileName
        ]
            .filter((p) => p !== undefined)
            .join("/");
    }

    public getModuleBreadcrumbs({
        path,
        includeFilename,
        isType
    }: {
        path: RapiddocsFilepath;
        includeFilename: boolean;
        isType?: boolean;
    }): string[] {
        const classPath = this.getClassPathFromTypeName(path);
        if (!this.shouldFlattenModules) {
            const modulePath = this.getModulePathFromTypeName(path);
            return [
                this.rootModule,
                ...(includeFilename && classPath !== undefined ? modulePath.concat([classPath]) : modulePath)
            ];
        } else {
            const modulePath = this.getModulePathFromTypeName(path, isType);
            return [this.rootModule, ...modulePath, ...(isType ? [TYPES_MODULE] : [])];
        }
    }

    public getModulePathFromTypeName(path: RapiddocsFilepath, allParts?: boolean): string[] {
        return (allParts ? path.allParts : path.packagePath).map((pathSegment) => pathSegment.pascalCase.safeName);
    }

    public getClassPathFromTypeName(path: RapiddocsFilepath): string | undefined {
        return path.file?.pascalCase.safeName;
    }
}
