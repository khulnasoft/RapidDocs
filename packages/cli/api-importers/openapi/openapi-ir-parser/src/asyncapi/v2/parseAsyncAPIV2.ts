import { OpenAPIV3 } from "openapi-types";

import {
    HeaderWithExample,
    PathParameterWithExample,
    PrimitiveSchemaValueWithExample,
    QueryParameterWithExample,
    SchemaId,
    SchemaWithExample,
    Source,
    WebsocketChannel,
    WebsocketSessionExample
} from "@khulnasoft/openapi-ir";

import { getExtension } from "../../getExtension";
import { RapiddocsOpenAPIExtension } from "../../openapi/v3/extensions/rapiddocsExtensions";
import { ParseOpenAPIOptions } from "../../options";
import { convertAvailability } from "../../schema/convertAvailability";
import { convertSchema } from "../../schema/convertSchemas";
import { UndiscriminatedOneOfPrefix, convertUndiscriminatedOneOf } from "../../schema/convertUndiscriminatedOneOf";
import { convertSchemaWithExampleToSchema } from "../../schema/utils/convertSchemaWithExampleToSchema";
import { isReferenceObject } from "../../schema/utils/isReferenceObject";
import { getSchemas } from "../../utils/getSchemas";
import { ExampleWebsocketSessionFactory } from "../ExampleWebsocketSessionFactory";
import { RapiddocsAsyncAPIExtension } from "../rapiddocsExtensions";
import { WebsocketSessionExampleExtension, getRapiddocsExamples } from "../getRapiddocsExamples";
import { ParseAsyncAPIOptions } from "../options";
import { AsyncAPIIntermediateRepresentation } from "../parse";
import { ServerContext } from "../sharedTypes";
import { constructServerUrl, transformToValidPath } from "../sharedUtils";
import { AsyncAPIV2 } from "../v2";
import { AsyncAPIV2ParserContext } from "./AsyncAPIV2ParserContext";

export function parseAsyncAPIV2({
    context,
    breadcrumbs,
    source,
    asyncApiOptions,
    document
}: {
    context: AsyncAPIV2ParserContext;
    breadcrumbs: string[];
    source: Source;
    asyncApiOptions: ParseAsyncAPIOptions;
    document: AsyncAPIV2.DocumentV2;
}): AsyncAPIIntermediateRepresentation {
    const schemas: Record<SchemaId, SchemaWithExample> = {};
    const parsedChannels: Record<string, WebsocketChannel> = {};

    for (const [schemaId, schema] of Object.entries(document.components?.schemas ?? {})) {
        const convertedSchema = convertSchema(schema, false, context, [schemaId], source, context.namespace);
        schemas[schemaId] = convertedSchema;
    }

    const exampleFactory = new ExampleWebsocketSessionFactory(schemas, context);

    const servers: Record<string, ServerContext> = {};
    for (const [serverId, server] of Object.entries(document.servers ?? {})) {
        servers[serverId] = {
            name: serverId,
            url: constructServerUrl(server.protocol, server.url)
        };
    }

    for (const [channelPath, channel] of Object.entries(document.channels ?? {})) {
        const shouldIgnore = getExtension<boolean>(channel, RapiddocsAsyncAPIExtension.IGNORE);
        if (shouldIgnore != null && shouldIgnore) {
            context.logger.debug(`Channel ${channelPath} is marked with x-rapiddocs-ignore. Skipping.`);
            continue;
        }

        const pathParameters: PathParameterWithExample[] = [];
        if (channel.parameters != null) {
            for (const [name, parameter] of Object.entries(channel.parameters ?? {})) {
                pathParameters.push({
                    name,
                    description: parameter.description,
                    parameterNameOverride: undefined,
                    schema:
                        parameter.schema != null
                            ? convertSchema(parameter.schema, false, context, breadcrumbs, source, context.namespace)
                            : SchemaWithExample.primitive({
                                  schema: PrimitiveSchemaValueWithExample.string({
                                      default: undefined,
                                      pattern: undefined,
                                      format: undefined,
                                      maxLength: undefined,
                                      minLength: undefined,
                                      example: undefined
                                  }),
                                  description: undefined,
                                  availability: undefined,
                                  generatedName: "",
                                  title: undefined,
                                  groupName: undefined,
                                  nameOverride: undefined
                              }),
                    variableReference: undefined,
                    availability: convertAvailability(parameter),
                    source
                });
            }
        }

        const headers: HeaderWithExample[] = [];
        const queryParameters: QueryParameterWithExample[] = [];
        if (channel.bindings?.ws != null) {
            if (channel.bindings.ws.headers != null) {
                const required = channel.bindings.ws.headers.required ?? [];
                for (const [name, schema] of Object.entries(channel.bindings.ws.headers.properties ?? {})) {
                    const resolvedHeader = isReferenceObject(schema) ? context.resolveSchemaReference(schema) : schema;
                    headers.push({
                        name,
                        schema: convertSchema(
                            resolvedHeader,
                            !required.includes(name),
                            context,
                            [...breadcrumbs, name],
                            source,
                            context.namespace
                        ),
                        description: resolvedHeader.description,
                        parameterNameOverride: undefined,
                        env: undefined,
                        availability: convertAvailability(resolvedHeader),
                        source
                    });
                }
            }

            if (channel.bindings.ws.query != null) {
                const required = channel.bindings.ws.query.required ?? [];
                for (const [name, schema] of Object.entries(channel.bindings.ws.query.properties ?? {})) {
                    const resolvedQueryParameter = isReferenceObject(schema)
                        ? context.resolveSchemaReference(schema)
                        : schema;
                    queryParameters.push({
                        name,
                        schema: convertSchema(
                            resolvedQueryParameter,
                            !required.includes(name),
                            context,
                            [...breadcrumbs, name],
                            source,
                            context.namespace
                        ),
                        description: resolvedQueryParameter.description,
                        parameterNameOverride: undefined,
                        availability: convertAvailability(resolvedQueryParameter),
                        source
                    });
                }
            }
        }

        let publishSchema: SchemaWithExample | undefined = undefined;
        if (channel.publish != null) {
            if ("oneOf" in channel.publish.message) {
                publishSchema = convertOneOfToSchema({
                    generatedName: channel.publish.operationId ?? "PublishEvent",
                    event: channel.publish,
                    breadcrumbs,
                    context,
                    source,
                    options: context.options,
                    asyncApiOptions
                });
            } else {
                publishSchema = convertMessageToSchema({
                    action: "Publish",
                    channelPath,
                    message: channel.publish.message as AsyncAPIV2.MessageV2,
                    context,
                    source
                });
            }
        }

        let subscribeSchema: SchemaWithExample | undefined = undefined;
        if (channel.subscribe != null) {
            if ("oneOf" in channel.subscribe.message) {
                subscribeSchema = convertOneOfToSchema({
                    generatedName: channel.subscribe.operationId ?? "SubscribeEvent",
                    event: channel.subscribe,
                    breadcrumbs,
                    context,
                    source,
                    options: context.options,
                    asyncApiOptions
                });
            } else {
                subscribeSchema = convertMessageToSchema({
                    action: "Subscribe",
                    channelPath,
                    message: channel.subscribe.message as AsyncAPIV2.MessageV2,
                    context,
                    source
                });
            }
        }

        if (headers.length > 0 || queryParameters.length > 0 || publishSchema != null || subscribeSchema != null) {
            // Reads the `x-rapiddocs-examples` extension from the channel
            const rapiddocsExamples: WebsocketSessionExampleExtension[] = getRapiddocsExamples(channel);
            let examples: WebsocketSessionExample[] = [];
            if (rapiddocsExamples.length > 0) {
                examples = exampleFactory.buildWebsocketSessionExamplesForExtension({
                    context,
                    extensionExamples: rapiddocsExamples,
                    handshake: {
                        headers,
                        queryParameters
                    },
                    publish: publishSchema,
                    subscribe: subscribeSchema,
                    source,
                    namespace: context.namespace
                });
            } else {
                const autogenExample = exampleFactory.buildWebsocketSessionExample({
                    handshake: {
                        headers,
                        queryParameters
                    },
                    publish: publishSchema,
                    subscribe: subscribeSchema
                });
                if (autogenExample != null) {
                    examples.push(autogenExample);
                }
            }

            const address = getExtension<string | undefined>(channel, RapiddocsAsyncAPIExtension.RAPIDDOCS_CHANNEL_ADDRESS);
            const path = address != null ? address : transformToValidPath(channelPath);
            parsedChannels[channelPath] = {
                audiences: getExtension<string[] | undefined>(channel, RapiddocsOpenAPIExtension.AUDIENCES) ?? [],
                handshake: {
                    headers: headers.map((header) => {
                        return {
                            ...header,
                            schema: convertSchemaWithExampleToSchema(header.schema),
                            env: header.env
                        };
                    }),
                    queryParameters: queryParameters.map((param) => {
                        return {
                            ...param,
                            schema: convertSchemaWithExampleToSchema(param.schema)
                        };
                    }),
                    pathParameters: pathParameters.map((param) => {
                        return {
                            ...param,
                            parameterNameOverride: undefined, // come back
                            schema: convertSchemaWithExampleToSchema(param.schema)
                        };
                    })
                },
                groupName: [
                    getExtension<string | undefined>(channel, RapiddocsAsyncAPIExtension.RAPIDDOCS_SDK_GROUP_NAME) ?? channelPath
                ],
                publish: publishSchema != null ? convertSchemaWithExampleToSchema(publishSchema) : publishSchema,
                subscribe:
                    subscribeSchema != null ? convertSchemaWithExampleToSchema(subscribeSchema) : subscribeSchema,
                servers: (channel.servers?.map((serverId) => servers[serverId]) ?? Object.values(servers)).filter(
                    (server): server is ServerContext => server != null
                ),
                summary: getExtension<string | undefined>(channel, RapiddocsAsyncAPIExtension.RAPIDDOCS_DISPLAY_NAME),
                path,
                description: undefined,
                examples,
                source
            };
        }
    }

    return {
        groupedSchemas: getSchemas(context.namespace, schemas),
        channels: parsedChannels != null ? parsedChannels : undefined,
        servers: Object.values(servers),
        basePath: getExtension<string | undefined>(document, RapiddocsAsyncAPIExtension.BASE_PATH)
    };
}

function convertOneOfToSchema({
    generatedName,
    event,
    context,
    breadcrumbs,
    source,
    options,
    asyncApiOptions
}: {
    breadcrumbs: string[];
    generatedName: string;
    event: AsyncAPIV2.PublishEvent | AsyncAPIV2.SubscribeEvent;
    context: AsyncAPIV2ParserContext;
    source: Source;
    options: ParseOpenAPIOptions;
    asyncApiOptions: ParseAsyncAPIOptions;
}): SchemaWithExample | undefined {
    if ("oneOf" in event.message && event.message.oneOf != null) {
        const subtypes: (OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject)[] = [];
        const prefixes: UndiscriminatedOneOfPrefix[] = [];
        for (const schema of event.message.oneOf) {
            let resolvedSchema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
            let namePrefix: UndiscriminatedOneOfPrefix = { type: "notFound" };
            if (isReferenceObject(schema)) {
                const resolvedMessage = context.resolveMessageReference(schema);
                if (!isReferenceObject(resolvedMessage.payload) && asyncApiOptions.naming === "v2") {
                    namePrefix = resolvedMessage.name ? { type: "name", name: resolvedMessage.name } : namePrefix;
                    resolvedSchema = {
                        ...resolvedMessage.payload,
                        title: resolvedMessage.name ?? resolvedMessage.payload.title,
                        description: resolvedMessage.name ?? resolvedMessage.payload.description
                    };
                } else {
                    resolvedSchema = resolvedMessage.payload;
                }
            } else {
                resolvedSchema = schema;
            }
            prefixes.push(namePrefix);
            subtypes.push(resolvedSchema);
        }
        return convertUndiscriminatedOneOf({
            description: event.description ?? event.message.description,
            availability: convertAvailability(event.message),
            subtypes,
            nameOverride: event.operationId,
            generatedName,
            title: event.message.title,
            groupName: undefined,
            wrapAsNullable: false,
            breadcrumbs,
            context,
            encoding: undefined,
            source,
            namespace: context.namespace,
            subtypePrefixOverrides: asyncApiOptions.naming === "v2" ? prefixes : []
        });
    }
    return undefined;
}

function convertMessageToSchema({
    action,
    channelPath,
    message,
    context,
    source
}: {
    action: "Publish" | "Subscribe";
    channelPath: string;
    message: AsyncAPIV2.MessageV2;
    context: AsyncAPIV2ParserContext;
    source: Source;
}): SchemaWithExample | undefined {
    if (message.payload != null) {
        let resolvedSchema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject = message.payload;
        if (isReferenceObject(message.payload)) {
            resolvedSchema = context.resolveSchemaReference(message.payload);
        }
        if (!isReferenceObject(resolvedSchema)) {
            return convertSchema(resolvedSchema, false, context, [channelPath, action], source, context.namespace);
        } else {
            return convertSchema(resolvedSchema, false, context, [channelPath, action], source, context.namespace);
        }
    }
    return undefined;
}
