import { generatorsYml } from "@khulnasoft/configuration";
import { OpenApiIntermediateRepresentation } from "@khulnasoft/openapi-ir";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/path-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { AbstractAPIWorkspace, AbstractAPIWorkspaceSync, RapiddocsDefinition, RapiddocsWorkspace } from "..";
import { RapiddocsDefinitionConverter } from "./RapiddocsDefinitionConverter";
import { OpenAPISettings } from "./OpenAPISettings";

export declare namespace BaseOpenAPIWorkspace {
    export interface Args extends AbstractAPIWorkspace.Args {
        inlinePathParameters: boolean | undefined;
        objectQueryParameters: boolean | undefined;
        onlyIncludeReferencedSchemas: boolean | undefined;
        respectReadonlySchemas: boolean | undefined;
        respectNullableSchemas: boolean | undefined;
        exampleGeneration: generatorsYml.OpenApiExampleGenerationSchema | undefined;
    }

    export type Settings = Partial<OpenAPISettings>;
}

export abstract class BaseOpenAPIWorkspace extends AbstractAPIWorkspace<BaseOpenAPIWorkspace.Settings> {
    public inlinePathParameters: boolean | undefined;
    public objectQueryParameters: boolean | undefined;
    public onlyIncludeReferencedSchemas: boolean | undefined;
    public respectReadonlySchemas: boolean | undefined;
    public respectNullableSchemas: boolean | undefined;
    public exampleGeneration: generatorsYml.OpenApiExampleGenerationSchema | undefined;

    private converter: RapiddocsDefinitionConverter;

    constructor(args: BaseOpenAPIWorkspace.Args) {
        super(args);
        this.inlinePathParameters = args.inlinePathParameters;
        this.objectQueryParameters = args.objectQueryParameters;
        this.onlyIncludeReferencedSchemas = args.onlyIncludeReferencedSchemas;
        this.respectReadonlySchemas = args.respectReadonlySchemas;
        this.respectNullableSchemas = args.respectNullableSchemas;
        this.exampleGeneration = args.exampleGeneration;
        this.converter = new RapiddocsDefinitionConverter(args);
    }

    public async getDefinition(
        {
            context,
            absoluteFilePath,
            relativePathToDependency
        }: {
            context: TaskContext;
            absoluteFilePath?: AbsoluteFilePath;
            relativePathToDependency?: RelativeFilePath;
        },
        settings?: BaseOpenAPIWorkspace.Settings
    ): Promise<RapiddocsDefinition> {
        const openApiIr = await this.getOpenAPIIr({ context, relativePathToDependency }, settings);
        return this.converter.convert({
            context,
            ir: openApiIr,
            settings,
            absoluteFilePath
        });
    }

    public async toRapiddocsWorkspace(
        { context }: { context: TaskContext },
        settings?: BaseOpenAPIWorkspace.Settings
    ): Promise<RapiddocsWorkspace> {
        const definition = await this.getDefinition({ context }, settings);
        return new RapiddocsWorkspace({
            absoluteFilePath: this.absoluteFilePath,
            workspaceName: this.workspaceName,
            generatorsConfiguration: this.generatorsConfiguration,
            dependenciesConfiguration: {
                dependencies: {}
            },
            definition,
            cliVersion: this.cliVersion
        });
    }

    public abstract getOpenAPIIr(
        {
            context,
            relativePathToDependency
        }: {
            context: TaskContext;
            relativePathToDependency?: RelativeFilePath;
        },
        settings?: BaseOpenAPIWorkspace.Settings
    ): Promise<OpenApiIntermediateRepresentation>;

    public abstract getAbsoluteFilePaths(): AbsoluteFilePath[];
}

export abstract class BaseOpenAPIWorkspaceSync extends AbstractAPIWorkspaceSync<BaseOpenAPIWorkspace.Settings> {
    public inlinePathParameters: boolean | undefined;
    public objectQueryParameters: boolean | undefined;
    public onlyIncludeReferencedSchemas: boolean | undefined;
    public respectReadonlySchemas: boolean | undefined;

    private converter: RapiddocsDefinitionConverter;

    constructor(args: BaseOpenAPIWorkspace.Args) {
        super(args);
        this.inlinePathParameters = args.inlinePathParameters;
        this.objectQueryParameters = args.objectQueryParameters;
        this.onlyIncludeReferencedSchemas = args.onlyIncludeReferencedSchemas;
        this.respectReadonlySchemas = args.respectReadonlySchemas;
        this.converter = new RapiddocsDefinitionConverter(args);
    }

    public getDefinition(
        {
            context,
            absoluteFilePath,
            relativePathToDependency
        }: {
            context: TaskContext;
            absoluteFilePath?: AbsoluteFilePath;
            relativePathToDependency?: RelativeFilePath;
        },
        settings?: BaseOpenAPIWorkspace.Settings
    ): RapiddocsDefinition {
        const openApiIr = this.getOpenAPIIr({ context, relativePathToDependency }, settings);
        return this.converter.convert({
            context,
            ir: openApiIr,
            settings,
            absoluteFilePath
        });
    }

    public toRapiddocsWorkspace(
        { context }: { context: TaskContext },
        settings?: BaseOpenAPIWorkspace.Settings
    ): RapiddocsWorkspace {
        const definition = this.getDefinition({ context }, settings);
        return new RapiddocsWorkspace({
            absoluteFilePath: this.absoluteFilePath,
            workspaceName: this.workspaceName,
            generatorsConfiguration: this.generatorsConfiguration,
            dependenciesConfiguration: {
                dependencies: {}
            },
            definition,
            cliVersion: this.cliVersion
        });
    }

    public abstract getOpenAPIIr(
        {
            context,
            relativePathToDependency
        }: {
            context: TaskContext;
            relativePathToDependency?: RelativeFilePath;
        },
        settings?: BaseOpenAPIWorkspace.Settings
    ): OpenApiIntermediateRepresentation;

    public abstract getAbsoluteFilePaths(): AbsoluteFilePath[];
}
