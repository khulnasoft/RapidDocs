import { OpenAPIV3_1 } from "openapi-types";
import { v4 as uuidv4 } from "uuid";

import {
    AbstractAPIWorkspace,
    BaseOpenAPIWorkspace,
    RapiddocsWorkspace,
    IdentifiableSource,
    Spec
} from "@khulnasoft/api-workspace-commons";
import { isNonNullish } from "@khulnasoft/core-utils";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/fs-utils";
import { IntermediateRepresentation } from "@khulnasoft/ir-sdk";
import { mergeIntermediateRepresentation } from "@khulnasoft/ir-utils";
import { OpenApiIntermediateRepresentation } from "@khulnasoft/openapi-ir";
import { parse } from "@khulnasoft/openapi-ir-parser";
import { ErrorCollector, OpenAPI3_1Converter, OpenAPIConverterContext3_1 } from "@khulnasoft/openapi-v2-parser";
import { TaskContext } from "@khulnasoft/task-context";

import { OpenAPILoader } from "./loaders/OpenAPILoader";
import { getAllOpenAPISpecs } from "./utils/getAllOpenAPISpecs";

export declare namespace OSSWorkspace {
    export interface Args extends AbstractAPIWorkspace.Args {
        specs: Spec[];
    }

    export type Settings = BaseOpenAPIWorkspace.Settings;
}

export class OSSWorkspace extends BaseOpenAPIWorkspace {
    public specs: Spec[];
    public sources: IdentifiableSource[];

    private loader: OpenAPILoader;

    constructor({ specs, ...superArgs }: OSSWorkspace.Args) {
        super({
            ...superArgs,
            respectReadonlySchemas: specs.every((spec) => spec.settings?.respectReadonlySchemas),
            respectNullableSchemas: specs.every((spec) => spec.settings?.respectNullableSchemas),
            onlyIncludeReferencedSchemas: specs.every((spec) => spec.settings?.onlyIncludeReferencedSchemas),
            inlinePathParameters: specs.every((spec) => spec.settings?.inlinePathParameters),
            objectQueryParameters: specs.every((spec) => spec.settings?.objectQueryParameters),
            exampleGeneration: specs[0]?.settings?.exampleGeneration
        });
        this.specs = specs;
        this.sources = this.convertSpecsToIdentifiableSources(specs);
        this.loader = new OpenAPILoader(this.absoluteFilePath);
    }

    public async getOpenAPIIr(
        {
            context,
            relativePathToDependency
        }: {
            context: TaskContext;
            relativePathToDependency?: RelativeFilePath;
        },
        settings?: OSSWorkspace.Settings
    ): Promise<OpenApiIntermediateRepresentation> {
        const openApiSpecs = await getAllOpenAPISpecs({ context, specs: this.specs, relativePathToDependency });
        return parse({
            context,
            documents: await this.loader.loadDocuments({
                context,
                specs: openApiSpecs
            }),
            options: {
                ...settings,
                respectReadonlySchemas: settings?.respectReadonlySchemas ?? this.respectReadonlySchemas,
                respectNullableSchemas: settings?.respectNullableSchemas ?? this.respectNullableSchemas,
                onlyIncludeReferencedSchemas:
                    settings?.onlyIncludeReferencedSchemas ?? this.onlyIncludeReferencedSchemas,
                inlinePathParameters: settings?.inlinePathParameters ?? this.inlinePathParameters,
                objectQueryParameters: settings?.objectQueryParameters ?? this.objectQueryParameters,
                exampleGeneration: settings?.exampleGeneration ?? this.exampleGeneration
            }
        });
    }

    /**
     * @beta This method is in beta and not ready for production use.
     * @internal
     * @owner dsinghvi
     */
    public async getIntermediateRepresentation({
        context
    }: {
        context: TaskContext;
    }): Promise<IntermediateRepresentation> {
        const openApiSpecs = await getAllOpenAPISpecs({ context, specs: this.specs });
        const documents = await this.loader.loadDocuments({
            context,
            specs: openApiSpecs
        });
        let mergedIr: IntermediateRepresentation | undefined;
        for (const document of documents) {
            if (document.type === "openapi") {
                const converterContext = new OpenAPIConverterContext3_1({
                    generationLanguage: "typescript",
                    logger: context.logger,
                    smartCasing: false,
                    spec: document.value as OpenAPIV3_1.Document
                });
                const converter = new OpenAPI3_1Converter({ context: converterContext });
                const errorCollector = new ErrorCollector({ logger: context.logger });
                const result = await converter.convert({
                    context: converterContext,
                    errorCollector
                });
                if (errorCollector.hasErrors()) {
                    context.logger.info("OpenAPI 3.1 Converter encountered errors:");
                    errorCollector.logErrors();
                }
                if (mergedIr === undefined) {
                    mergedIr = result;
                } else {
                    mergedIr = mergeIntermediateRepresentation(mergedIr, result);
                }
            }
        }
        if (mergedIr === undefined) {
            throw new Error("No OpenAPI document found");
        }
        return mergedIr;
    }

    public async toRapiddocsWorkspace(
        { context }: { context: TaskContext },
        settings?: OSSWorkspace.Settings
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
            cliVersion: this.cliVersion,
            sources: this.sources
        });
    }

    public getAbsoluteFilePaths(): AbsoluteFilePath[] {
        return [
            this.absoluteFilePath,
            ...this.specs
                .flatMap((spec) => [
                    spec.type === "protobuf" ? spec.absoluteFilepathToProtobufTarget : spec.absoluteFilepath,
                    spec.absoluteFilepathToOverrides
                ])
                .filter(isNonNullish)
        ];
    }

    public getSources(): IdentifiableSource[] {
        return this.sources;
    }

    private convertSpecsToIdentifiableSources(specs: Spec[]): IdentifiableSource[] {
        const seen = new Set<string>();
        const result: IdentifiableSource[] = [];
        return specs.reduce((acc, spec) => {
            const absoluteFilePath =
                spec.type === "protobuf" ? spec.absoluteFilepathToProtobufRoot : spec.absoluteFilepath;

            if (!seen.has(absoluteFilePath)) {
                seen.add(absoluteFilePath);
                acc.push({
                    type: spec.type,
                    id: uuidv4(),
                    absoluteFilePath
                });
            }

            return acc;
        }, result);
    }
}
