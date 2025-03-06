import yaml from "js-yaml";
import { mapValues } from "lodash-es";

import { RAPIDDOCS_PACKAGE_MARKER_FILENAME } from "@khulnasoft/configuration";
import { OpenApiIntermediateRepresentation } from "@khulnasoft/openapi-ir";
import { convert, getConvertOptions } from "@khulnasoft/openapi-ir-to-rapiddocs";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/path-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { RapiddocsDefinition } from "..";
import { BaseOpenAPIWorkspace } from "./BaseOpenAPIWorkspace";

export class RapiddocsDefinitionConverter {
    constructor(private readonly args: BaseOpenAPIWorkspace.Args) {}

    public convert({
        context,
        ir,
        settings,
        absoluteFilePath
    }: {
        context: TaskContext;
        ir: OpenApiIntermediateRepresentation;
        settings?: BaseOpenAPIWorkspace.Settings;
        absoluteFilePath?: AbsoluteFilePath;
    }): RapiddocsDefinition {
        const definition = convert({
            taskContext: context,
            ir,
            options: getConvertOptions({
                overrides: {
                    ...settings,
                    respectReadonlySchemas: settings?.respectReadonlySchemas ?? this.args.respectReadonlySchemas,
                    respectNullableSchemas: settings?.respectNullableSchemas ?? this.args.respectNullableSchemas,
                    onlyIncludeReferencedSchemas:
                        settings?.onlyIncludeReferencedSchemas ?? this.args.onlyIncludeReferencedSchemas,
                    inlinePathParameters: settings?.inlinePathParameters ?? this.args.inlinePathParameters,
                    objectQueryParameters: settings?.objectQueryParameters ?? this.args.objectQueryParameters
                }
            }),
            authOverrides:
                this.args.generatorsConfiguration?.api?.auth != null
                    ? { ...this.args.generatorsConfiguration?.api }
                    : undefined,
            environmentOverrides:
                this.args.generatorsConfiguration?.api?.environments != null
                    ? { ...this.args.generatorsConfiguration?.api }
                    : undefined,
            globalHeaderOverrides:
                this.args.generatorsConfiguration?.api?.headers != null
                    ? { ...this.args.generatorsConfiguration?.api }
                    : undefined
        });

        return {
            absoluteFilePath: absoluteFilePath ?? this.args.absoluteFilePath,
            rootApiFile: {
                defaultUrl: definition.rootApiFile["default-url"],
                contents: definition.rootApiFile,
                rawContents: yaml.dump(definition.rootApiFile)
            },
            namedDefinitionFiles: {
                ...mapValues(definition.definitionFiles, (definitionFile) => ({
                    absoluteFilepath: absoluteFilePath ?? this.args.absoluteFilePath,
                    rawContents: yaml.dump(definitionFile),
                    contents: definitionFile
                })),
                [RelativeFilePath.of(RAPIDDOCS_PACKAGE_MARKER_FILENAME)]: {
                    absoluteFilepath: absoluteFilePath ?? this.args.absoluteFilePath,
                    rawContents: yaml.dump(definition.packageMarkerFile),
                    contents: definition.packageMarkerFile
                }
            },
            packageMarkers: {},
            importedDefinitions: {}
        };
    }
}
