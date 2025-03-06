import { ConjureAuthDefinitionType, DefinitionFile } from "@khulnasoft/conjure-sdk";
import { parseEndpointLocator, removeSuffix } from "@khulnasoft/core-utils";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { AbsoluteFilePath, RelativeFilePath, dirname, getFilename, join, relativize } from "@khulnasoft/fs-utils";
import { APIDefinitionImporter, RapiddocsDefinitionBuilderImpl, HttpServiceInfo } from "@khulnasoft/importer-commons";

import { listConjureFiles } from "./utils/listConjureFiles";
import { visitConjureTypeDeclaration } from "./utils/visitConjureTypeDeclaration";

export declare namespace ConjureImporter {
    interface Args {
        absolutePathToConjureFolder: AbsoluteFilePath;
        authOverrides?: RawSchemas.WithAuthSchema;
        environmentOverrides?: RawSchemas.WithEnvironmentsSchema;
        globalHeaderOverrides?: RawSchemas.WithHeadersSchema;
    }
}

export class ConjureImporter extends APIDefinitionImporter<ConjureImporter.Args> {
    private rapiddocsDefinitionBuilder = new RapiddocsDefinitionBuilderImpl(false);
    private conjureFilepathToRapiddocsFilepath: Record<RelativeFilePath, RelativeFilePath> = {};

    public async import({
        absolutePathToConjureFolder,
        authOverrides,
        environmentOverrides,
        globalHeaderOverrides
    }: ConjureImporter.Args): Promise<APIDefinitionImporter.Return> {
        if (authOverrides != null) {
            for (const [name, declaration] of Object.entries(authOverrides["auth-schemes"] ?? {})) {
                this.rapiddocsDefinitionBuilder.addAuthScheme({
                    name,
                    schema: declaration
                });
            }
            if (authOverrides.auth != null) {
                this.rapiddocsDefinitionBuilder.setAuth(authOverrides.auth);
            }
        }

        if (environmentOverrides != null) {
            for (const [environment, environmentDeclaration] of Object.entries(
                environmentOverrides.environments ?? {}
            )) {
                this.rapiddocsDefinitionBuilder.addEnvironment({
                    name: environment,
                    schema: environmentDeclaration
                });
            }
            if (environmentOverrides["default-environment"] != null) {
                this.rapiddocsDefinitionBuilder.setDefaultEnvironment(environmentOverrides["default-environment"]);
            }
            if (environmentOverrides["default-url"] != null) {
                this.rapiddocsDefinitionBuilder.setDefaultUrl(environmentOverrides["default-url"]);
            }
        }

        await visitAllConjureDefinitionFiles(absolutePathToConjureFolder, (absoluteFilepath, filepath, definition) => {
            for (const [serviceName, _] of Object.entries(definition.services ?? {})) {
                const unsuffixedServiceName = removeSuffix({ value: serviceName, suffix: "Service" });
                this.conjureFilepathToRapiddocsFilepath[filepath] = RelativeFilePath.of(
                    `${unsuffixedServiceName}/__package__.yml`
                );
                return;
            }

            const filename = getFilename(filepath);
            const filenameWithoutExtension = filename?.split(".")[0];
            if (filenameWithoutExtension != null) {
                this.conjureFilepathToRapiddocsFilepath[filepath] = RelativeFilePath.of(
                    `${filenameWithoutExtension}/__package__.yml`
                );
            }
        });

        await visitAllConjureDefinitionFiles(absolutePathToConjureFolder, (absoluteFilepath, filepath, definition) => {
            if (definition.services == null || Object.keys(definition.services ?? {}).length === 0) {
                const rapiddocsFilePath = this.conjureFilepathToRapiddocsFilepath[filepath];
                if (rapiddocsFilePath == null) {
                    throw new Error(`Failed to find corresponding rapiddocs filepath for conjure file ${filepath}`);
                }

                for (const [import_, importedFilepath] of Object.entries(definition.types?.conjureImports ?? {})) {
                    const rapiddocsFileToImport = this.getRapiddocsFileToImport({
                        absoluteFilePathToConjureFile: absoluteFilepath,
                        absoluteFilePathToConjureFolder: absolutePathToConjureFolder,
                        importFilePath: RelativeFilePath.of(importedFilepath)
                    });
                    this.rapiddocsDefinitionBuilder.addImport({
                        file: rapiddocsFilePath,
                        fileToImport: RelativeFilePath.of(rapiddocsFileToImport),
                        alias: import_
                    });
                }
                this.importAllTypes({ conjureFile: definition, rapiddocsFilePath });

                return;
            }

            for (const [serviceName, serviceDeclaration] of Object.entries(definition.services)) {
                const unsuffixedServiceName = removeSuffix({ value: serviceName, suffix: "Service" });
                const rapiddocsFilePath = RelativeFilePath.of(`${unsuffixedServiceName}/__package__.yml`);

                const httpServiceInfo: HttpServiceInfo = {};
                if (serviceDeclaration.basePath != null) {
                    httpServiceInfo["base-path"] = serviceDeclaration.basePath;
                }
                if (serviceDeclaration.docs != null) {
                    httpServiceInfo.docs = serviceDeclaration.docs;
                }
                this.rapiddocsDefinitionBuilder.setServiceInfo(rapiddocsFilePath, httpServiceInfo);

                this.importAllTypes({ conjureFile: definition, rapiddocsFilePath });

                for (const [import_, importedFilepath] of Object.entries(definition.types?.conjureImports ?? {})) {
                    const rapiddocsFileToImport = this.getRapiddocsFileToImport({
                        absoluteFilePathToConjureFile: absoluteFilepath,
                        absoluteFilePathToConjureFolder: absolutePathToConjureFolder,
                        importFilePath: RelativeFilePath.of(importedFilepath)
                    });
                    this.rapiddocsDefinitionBuilder.addImport({
                        file: rapiddocsFilePath,
                        fileToImport: RelativeFilePath.of(rapiddocsFileToImport),
                        alias: import_
                    });
                }

                for (const [endpointName, endpointDeclaration] of Object.entries(serviceDeclaration.endpoints ?? {})) {
                    const endpointLocator = parseEndpointLocator(endpointDeclaration.http);

                    if (endpointLocator.type === "failure") {
                        this.context?.logger.error(`Failed to parse ${endpointDeclaration.http}. Skipping.`);
                        continue;
                    }

                    const auth = endpointDeclaration.auth ?? serviceDeclaration.defaultAuth;

                    const endpoint: RawSchemas.HttpEndpointSchema = {
                        auth: auth === ConjureAuthDefinitionType.None ? false : true,
                        path: endpointLocator.path,
                        method: endpointLocator.method,
                        response: endpointDeclaration.returns === "binary" ? "file" : endpointDeclaration.returns
                    };

                    if (endpointDeclaration.docs != null) {
                        endpoint.docs = endpointDeclaration.docs;
                    }

                    const pathParameters: Record<string, RawSchemas.HttpPathParameterSchema> = {};
                    if (endpointDeclaration.args != null) {
                        for (const pathParameter of endpointLocator.pathParameters) {
                            const pathParameterType = endpointDeclaration.args[pathParameter];
                            if (pathParameterType == null) {
                                throw new Error(
                                    `Failed to find path parameter ${pathParameter} in ${endpointDeclaration.http}`
                                );
                            }
                            pathParameters[pathParameter] =
                                typeof pathParameterType === "string"
                                    ? pathParameterType
                                    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      { type: pathParameterType.type as any };
                        }
                    }

                    if (Object.entries(pathParameters).length > 0) {
                        endpoint["path-parameters"] = pathParameters;
                    }

                    for (const [arg, argDeclaration] of Object.entries(endpointDeclaration.args ?? {})) {
                        if (pathParameters[arg] != null) {
                            continue;
                        }
                        if (typeof argDeclaration === "string") {
                            if (!endpoint.request) {
                                endpoint.request = {};
                            } else if (typeof endpoint.request === "string") {
                                endpoint.request = { body: endpoint.request };
                            }
                            endpoint.request.body = argDeclaration === "binary" ? "bytes" : argDeclaration;
                        } else {
                            switch (argDeclaration.paramType) {
                                case "body":
                                    endpoint.request = {
                                        body: argDeclaration.type === "binary" ? "bytes" : argDeclaration.type
                                    };
                                    break;
                                case "query": {
                                    if (endpoint.request == null) {
                                        endpoint.request = { "query-parameters": { [arg]: argDeclaration.type } };
                                    } else if (
                                        typeof endpoint.request !== "string" &&
                                        endpoint.request?.["query-parameters"] == null
                                    ) {
                                        endpoint.request["query-parameters"] = { [arg]: argDeclaration.type };
                                    } else if (
                                        typeof endpoint.request !== "string" &&
                                        endpoint.request?.["query-parameters"] != null
                                    ) {
                                        endpoint.request["query-parameters"][arg] = argDeclaration.type;
                                    }
                                }
                            }
                        }
                    }

                    if (
                        endpoint.request != null &&
                        typeof endpoint.request !== "string" &&
                        endpoint.request?.["query-parameters"] != null
                    ) {
                        endpoint.request.name = `${endpointName}Request`;
                    }

                    this.rapiddocsDefinitionBuilder.addEndpoint(rapiddocsFilePath, {
                        name: endpointName,
                        schema: endpoint,
                        source: undefined
                    });
                }
            }
        });
        return this.rapiddocsDefinitionBuilder.build();
    }

    private importAllTypes({
        conjureFile,
        rapiddocsFilePath
    }: {
        conjureFile: DefinitionFile;
        rapiddocsFilePath: RelativeFilePath;
    }): void {
        for (const [typeName, typeDeclaration] of Object.entries(conjureFile.types?.definitions?.objects ?? {})) {
            visitConjureTypeDeclaration(typeDeclaration, {
                alias: (value) => {
                    this.rapiddocsDefinitionBuilder.addType(rapiddocsFilePath, {
                        name: typeName,
                        schema: {
                            type: value.alias,
                            docs: value.docs
                        }
                    });
                },
                object: (value) => {
                    this.rapiddocsDefinitionBuilder.addType(rapiddocsFilePath, {
                        name: typeName,
                        schema: {
                            properties: value.fields
                        }
                    });
                },
                enum: (value) => {
                    this.rapiddocsDefinitionBuilder.addType(rapiddocsFilePath, {
                        name: typeName,
                        schema: {
                            enum: value.values
                        }
                    });
                },
                union: (value) => {
                    this.rapiddocsDefinitionBuilder.addType(rapiddocsFilePath, {
                        name: typeName,
                        schema: {
                            union: Object.fromEntries(
                                Object.entries(value.union).map(([key, type]) => {
                                    return [
                                        key,
                                        {
                                            type: typeof type === "string" ? type : type.type,
                                            docs: typeof type === "string" ? undefined : type.docs,
                                            key
                                        }
                                    ];
                                })
                            )
                        }
                    });
                }
            });
        }
    }

    private getRapiddocsFileToImport({
        absoluteFilePathToConjureFile,
        importFilePath,
        absoluteFilePathToConjureFolder
    }: {
        absoluteFilePathToConjureFile: AbsoluteFilePath;
        importFilePath: RelativeFilePath;
        absoluteFilePathToConjureFolder: AbsoluteFilePath;
    }): RelativeFilePath {
        const absoluteFilePathToImportedFile = join(
            dirname(absoluteFilePathToConjureFile),
            RelativeFilePath.of(importFilePath)
        );
        const relativeFilePathToImportedFile = relativize(
            absoluteFilePathToConjureFolder,
            absoluteFilePathToImportedFile
        );
        const correspondingRapiddocsFilePath = this.conjureFilepathToRapiddocsFilepath[relativeFilePathToImportedFile];
        if (correspondingRapiddocsFilePath == null) {
            throw new Error(
                `Failed to find corresponding rapiddocs filepath for conjure file ${relativeFilePathToImportedFile}`
            );
        }
        return correspondingRapiddocsFilePath;
    }
}

export async function visitAllConjureDefinitionFiles(
    absolutePathToConjureFolder: AbsoluteFilePath,
    visitor: (
        absoluteFilepath: AbsoluteFilePath,
        filepath: RelativeFilePath,
        definitionFile: DefinitionFile
    ) => void | Promise<void>
): Promise<void> {
    for (const conjureFile of await listConjureFiles(absolutePathToConjureFolder, "{yml,yaml}")) {
        await visitor(conjureFile.absoluteFilepath, conjureFile.relativeFilepath, conjureFile.fileContents);
    }
}
