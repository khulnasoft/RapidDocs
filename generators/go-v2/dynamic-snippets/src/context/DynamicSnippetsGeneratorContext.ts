import {
    AbstractDynamicSnippetsGeneratorContext,
    RapiddocsGeneratorExec
} from "@khulnasoft/browser-compatible-base-generator";
import { RapiddocsIr } from "@fern-api/dynamic-ir-sdk";
import { BaseGoCustomConfigSchema, resolveRootImportPath } from "@khulnasoft/go-ast";
import { go } from "@khulnasoft/go-ast";

import { DynamicTypeInstantiationMapper } from "./DynamicTypeInstantiationMapper";
import { DynamicTypeMapper } from "./DynamicTypeMapper";
import { FilePropertyMapper } from "./FilePropertyMapper";

export class DynamicSnippetsGeneratorContext extends AbstractDynamicSnippetsGeneratorContext {
    public ir: RapiddocsIr.dynamic.DynamicIntermediateRepresentation;
    public customConfig: BaseGoCustomConfigSchema | undefined;
    public dynamicTypeMapper: DynamicTypeMapper;
    public dynamicTypeInstantiationMapper: DynamicTypeInstantiationMapper;
    public filePropertyMapper: FilePropertyMapper;
    public rootImportPath: string;

    constructor({
        ir,
        config
    }: {
        ir: RapiddocsIr.dynamic.DynamicIntermediateRepresentation;
        config: RapiddocsGeneratorExec.GeneratorConfig;
    }) {
        super({ ir, config });
        this.ir = ir;
        this.customConfig = config.customConfig != null ? (config.customConfig as BaseGoCustomConfigSchema) : undefined;
        this.dynamicTypeMapper = new DynamicTypeMapper({ context: this });
        this.dynamicTypeInstantiationMapper = new DynamicTypeInstantiationMapper({ context: this });
        this.filePropertyMapper = new FilePropertyMapper({ context: this });
        this.rootImportPath = resolveRootImportPath({ config, customConfig: this.customConfig });
    }

    public clone(): DynamicSnippetsGeneratorContext {
        return new DynamicSnippetsGeneratorContext({
            ir: this.ir,
            config: this.config
        });
    }

    public getMethodName(name: RapiddocsIr.Name): string {
        return name.pascalCase.unsafeName;
    }

    public getTypeName(name: RapiddocsIr.Name): string {
        return name.pascalCase.unsafeName;
    }

    public getImportPath(rapiddocsFilepath: RapiddocsIr.RapiddocsFilepath): string {
        const parts = rapiddocsFilepath.packagePath.map((path) => path.pascalCase.unsafeName.toLowerCase());
        return [this.rootImportPath, ...parts].join("/");
    }

    public getContextTypeReference(): go.TypeReference {
        return go.typeReference({
            name: "Context",
            importPath: "context"
        });
    }

    public getContextTodoFunctionInvocation(): go.FuncInvocation {
        return go.invokeFunc({
            func: go.typeReference({
                name: "TODO",
                importPath: "context"
            }),
            arguments_: []
        });
    }

    public getIoReaderTypeReference(): go.TypeReference {
        return go.typeReference({
            name: "Reader",
            importPath: "io"
        });
    }

    public getNewStringsReaderFunctionInvocation(s: string): go.FuncInvocation {
        return go.invokeFunc({
            func: go.typeReference({
                name: "NewReader",
                importPath: "strings"
            }),
            arguments_: [go.TypeInstantiation.string(s)]
        });
    }

    public getClientConstructorName(): string {
        if (this.customConfig?.clientConstructorName != null) {
            return this.customConfig.clientConstructorName;
        }
        if (this.customConfig?.exportedClientName != null) {
            return `New${this.customConfig.exportedClientName}`;
        }
        return `New${this.getClientName()}`;
    }

    public getClientName(): string {
        if (this.customConfig?.clientName != null) {
            return this.customConfig.clientName;
        }
        return "Client";
    }

    public getClientImportPath(): string {
        if (this.customConfig?.packageLayout === "flat") {
            return this.rootImportPath;
        }
        return `${this.rootImportPath}/client`;
    }

    public getOptionImportPath(): string {
        return `${this.rootImportPath}/option`;
    }

    public getGoTypeReferenceFromDeclaration({
        declaration
    }: {
        declaration: RapiddocsIr.dynamic.Declaration;
    }): go.TypeReference {
        return go.typeReference({
            name: declaration.name.pascalCase.unsafeName,
            importPath: this.getImportPath(declaration.rapiddocsFilepath)
        });
    }

    public getEnvironmentTypeReferenceFromID(environmentID: string): go.TypeReference | undefined {
        const environmentName = this.resolveEnvironmentName(environmentID);
        if (environmentName == null) {
            return undefined;
        }
        return this.getEnvironmentTypeReference(environmentName);
    }

    private getEnvironmentTypeReference(name: RapiddocsIr.Name): go.TypeReference {
        return go.typeReference({
            name: `Environments.${this.getTypeName(name)}`,
            importPath: this.rootImportPath
        });
    }
}
