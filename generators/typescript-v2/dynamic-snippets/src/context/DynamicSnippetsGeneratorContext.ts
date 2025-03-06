import {
    AbstractDynamicSnippetsGeneratorContext,
    RapiddocsGeneratorExec
} from "@khulnasoft/browser-compatible-base-generator";
import { RapiddocsIr } from "@fern-api/dynamic-ir-sdk";
import { TypescriptCustomConfigSchema, ts } from "@khulnasoft/typescript-ast";
import { constructNpmPackage, getNamespaceExport } from "@khulnasoft/typescript-browser-compatible-base";

import { DynamicTypeLiteralMapper } from "./DynamicTypeLiteralMapper";
import { FilePropertyMapper } from "./FilePropertyMapper";

export class DynamicSnippetsGeneratorContext extends AbstractDynamicSnippetsGeneratorContext {
    public ir: RapiddocsIr.dynamic.DynamicIntermediateRepresentation;
    public customConfig: TypescriptCustomConfigSchema | undefined;
    public dynamicTypeLiteralMapper: DynamicTypeLiteralMapper;
    public filePropertyMapper: FilePropertyMapper;
    public moduleName: string;
    public namespaceExport: string;

    constructor({
        ir,
        config
    }: {
        ir: RapiddocsIr.dynamic.DynamicIntermediateRepresentation;
        config: RapiddocsGeneratorExec.GeneratorConfig;
    }) {
        super({ ir, config });
        this.ir = ir;
        this.customConfig =
            config.customConfig != null ? (config.customConfig as TypescriptCustomConfigSchema) : undefined;
        this.dynamicTypeLiteralMapper = new DynamicTypeLiteralMapper({ context: this });
        this.filePropertyMapper = new FilePropertyMapper({ context: this });
        this.moduleName = getModuleName({ config, customConfig: this.customConfig });
        this.namespaceExport = getNamespaceExport({
            organization: config.organization,
            workspaceName: config.workspaceName,
            namespaceExport: this.customConfig?.namespaceExport
        });
    }

    public clone(): DynamicSnippetsGeneratorContext {
        return new DynamicSnippetsGeneratorContext({
            ir: this.ir,
            config: this.config
        });
    }

    public getModuleImport(): ts.Reference.ModuleImport {
        return {
            type: "named",
            moduleName: this.moduleName
        };
    }

    public getRootClientName(): string {
        return `${this.namespaceExport}Client`;
    }

    public getPropertyName(name: RapiddocsIr.Name): string {
        if (this.customConfig?.retainOriginalCasing || this.customConfig?.noSerdeLayer) {
            return this.formatOriginalPropertyName(name.originalName);
        }
        return name.camelCase.unsafeName;
    }

    public getMethodName(name: RapiddocsIr.Name): string {
        return name.camelCase.unsafeName;
    }

    public getTypeName(name: RapiddocsIr.Name): string {
        return name.pascalCase.unsafeName;
    }

    public getEnvironmentTypeReferenceFromID(environmentID: string): ts.Reference | undefined {
        const environmentName = this.resolveEnvironmentName(environmentID);
        if (environmentName == null) {
            return undefined;
        }
        return this.getEnvironmentsTypeReference(environmentName);
    }

    public getFullyQualifiedReference({ declaration }: { declaration: RapiddocsIr.dynamic.Declaration }): string {
        if (declaration.rapiddocsFilepath.allParts.length > 0) {
            return `${declaration.rapiddocsFilepath.allParts
                .map((val) => val.camelCase.unsafeName)
                .join(".")}.${this.getTypeName(declaration.name)}`;
        }
        return `${this.getTypeName(declaration.name)}`;
    }

    private getEnvironmentsTypeReference(name: RapiddocsIr.Name): ts.Reference {
        return ts.reference({
            name: `${this.namespaceExport}Environment`,
            importFrom: this.getModuleImport(),
            memberName: this.getTypeName(name)
        });
    }

    private formatOriginalPropertyName(value: string): string {
        if (value.includes("-")) {
            // For example, header names like the following:
            //
            // {
            //   "X-API-Version": "X-API-Version",
            //   body: "string"
            // }
            return `"${value}"`;
        }
        return value;
    }
}

function getModuleName({
    config,
    customConfig
}: {
    config: RapiddocsGeneratorExec.GeneratorConfig;
    customConfig: TypescriptCustomConfigSchema | undefined;
}): string {
    return (
        constructNpmPackage({
            generatorConfig: config,
            isPackagePrivate: customConfig?.private ?? false
        })?.packageName ?? config.organization
    );
}
