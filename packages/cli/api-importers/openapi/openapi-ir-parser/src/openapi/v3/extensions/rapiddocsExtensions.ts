import { Plugin } from "@redocly/openapi-core/lib/config";
import { NodeType } from "@redocly/openapi-core/lib/types";

import { Values } from "@khulnasoft/core-utils";

import { TypedExtensionId } from "./id";

export const XRapiddocsStreaming: NodeType = {
    properties: {
        "stream-condition": { type: "string" },
        response: "Schema",
        "response-stream": "Schema"
    },
    required: ["stream-condition", "response", "response-stream"],
    extensionsPrefix: "x-"
};

export const RAPIDDOCS_TYPE_EXTENSIONS: Plugin = {
    id: "",
    typeExtension: {
        oas3: (types) => {
            return {
                ...types,
                XRapiddocsStreaming,
                Operation: {
                    ...types.Operation,
                    properties: {
                        ...types.Operation?.properties,
                        "x-rapiddocs-streaming": "XRapiddocsStreaming"
                    }
                }
            };
        }
    }
};

export const RapiddocsOpenAPIExtension = {
    SOURCE: TypedExtensionId.of<string>("source"),

    SDK_METHOD_NAME: TypedExtensionId.of<string>("x-rapiddocs-sdk-method-name"),
    SDK_GROUP_NAME: TypedExtensionId.of<string | string[]>("x-rapiddocs-sdk-group-name"),

    REQUEST_NAME_V1: "x-request-name",
    REQUEST_NAME_V2: "x-rapiddocs-request-name",
    TYPE_NAME: "x-rapiddocs-type-name",
    BOOLEAN_LITERAL: "x-rapiddocs-boolean-literal",

    SERVER_NAME_V1: "x-name",
    SERVER_NAME_V2: "x-rapiddocs-server-name",

    /**
     * Prepends the configured base path to all of the endpoint paths.
     *
     * x-rapiddocs-base-path: /v1
     * servers:
     *   - url: https://api.example.com
     * paths:
     *   /path/to/my/endpoint:
     */
    BASE_PATH: "x-rapiddocs-base-path",

    /**
     * Should align with the OpenAPI spec's `x-rapiddocs-sdk-group-name` extension.
     * This is a place where you can specify any display names related to the
     * configured SDK group names. These display names and descriptions will
     * come through in the docs.
     *
     * x-rapiddocs-groups:
     *  group1:
     *    display-name: Group 1
     *    description: This is group 1
     *    groups:
     *      group2 # add child groups
     */
    GROUPS: TypedExtensionId.of<string | string[]>("x-rapiddocs-groups"),

    /**
     * Filepath that contains any OpenAPI overrides
     * that you wan't Rapiddocs to add on top of your existing spec.
     *
     * x-rapiddocs-overrides-filepath: relative/path/to/file
     */
    OPENAPI_OVERIDES_FILEPATH: "x-rapiddocs-overrides-filepath",

    /**
     * Used to override the type with rapiddocs's type syntax
     * Bar:
     *  properties:
     *    createdDate:
     *      type: string
     *      x-rapiddocs-type: datetime
     *      x-rapiddocs-type:
     *        properties:
     *         a: string
     *         b: integer
     *      x-rapiddocs-type: optional<map<string, integer>>
     */
    TYPE_DEFINITION: "x-rapiddocs-type",

    /**
     * Used to specify if an endpoint should be generated
     * as a streaming endpoint.
     *
     * Example usage:
     *   paths:
     *     /path/to/my/endpoint:
     *       x-rapiddocs-streaming: true
     *
     * Used to specify if an endpoint should be generated
     * as a streaming endpoint with sever-sent0events.
     *
     * Example usage:
     *   paths:
     *     /path/to/my/endpoint:
     *       x-rapiddocs-streaming:
     *          format: sse
     *
     * Alternatively, you can annotate the endpoint so that
     * it generates both a traditional unary endpoint,
     * as well as its streaming equivalent. The stream
     * condition property is included to specify a boolean
     * property that tells the server whether or not the
     * response should be streamed or not.
     *
     * Example usage:
     *   paths:
     *     /path/to/my/endpoint:
     *       x-rapiddocs-streaming:
     *         format: sse # or json
     *         stream-condition: $request.stream
     *         stream-description: A description
     *         response:
     *           $ref: ./path/to/response/type.yaml
     *         response-stream:
     *           $ref: ./path/to/response-stream/type.yaml
     */
    STREAMING: "x-rapiddocs-streaming",

    /**
     * Used to specify if an endpoint should be generated
     * as a paginated endpoint. Both cursor, offset pagination
     * examples are shown below.
     *
     * Example usage:
     *   paths:
     *     /path/to/my/endpoint:
     *       x-rapiddocs-pagination:
     *         cursor: $request.cursor
     *         next_cursor: $response.next
     *         results: $response.results
     *
     * Alternatively, if the configuration shown above is
     * specified at the document-level, paths can inherit the
     * configuration by setting the extension to true.
     *
     * Example usage:
     *   x-rapiddocs-pagination:
     *     offset: $request.page_number
     *     results: $response.results
     *
     *   paths:
     *     /path/to/my/endpoint:
     *       x-rapiddocs-pagination: true
     */
    PAGINATION: "x-rapiddocs-pagination",

    /**
     * Used to specify if an endpoint is actually
     * representing a webhook
     * Example usage:
     *   paths:
     *     /path/to/my/endpoint:
     *       x-rapiddocs-webhook: true
     */
    WEBHOOK: "x-rapiddocs-webhook",

    /**
     * Used to detect if an endpoint has an async version of it
     * Example usage:
     *   paths:
     *    /path/to/my/endpoint:
     *      x-rapiddocs-async-config:
     *        discriminant:
     *          type: header
     *          name: X-Header-Name
     *          value: async
     *        response-status-code: 202
     **/
    ASYNC_CONFIG: "x-rapiddocs-async-config",

    /**
     * Used to create variables in the rapiddocs definition
     * Example usage:
     * x-rapiddocs-sdk-variables:
     *   appName:
     *     type: string
     * paths:
     *   /path/to/my/endpoint/{id}:
     *     parameters:
     *       - name: id
     *         in: path
     *         type: string
     *         x-rapiddocs-sdk-variable: appName
     */
    SDK_VARIABLES: "x-rapiddocs-sdk-variables",
    SDK_VARIABLE: "x-rapiddocs-sdk-variable",

    /**
     * Used to customize the name of the parameter used for a header.
     * Example usage:
     * paths:
     *   /path/to/my/endpoint/{id}:
     *     parameters:
     *       - in: header
     *         name: X-Rapiddocs-Version
     *         type: string
     *         x-rapiddocs-parameter-name: version
     */
    PARAMETER_NAME: "x-rapiddocs-parameter-name",

    /**
     * securitySchemes:
     *   Basic:
     *     scheme: http
     *     type: basic
     *     x-rapiddocs-username-variable-name: clientId
     *     x-rapiddocs-password-variable-name: clientSecret
     */
    BASIC_AUTH_USERNAME_VARIABLE_NAME: "x-rapiddocs-username-variable-name",
    BASIC_AUTH_PASSWORD_VARIABLE_NAME: "x-rapiddocs-password-variable-name",

    /**
     * securitySchemes:
     *   Bearer:
     *     scheme: http
     *     type: bearer
     *     x-rapiddocs-token-variable-name: apiKey
     */
    BEARER_TOKEN_VARIABLE_NAME: "x-rapiddocs-token-variable-name",

    /**
     * securitySchemes:
     *   Bearer:
     *     type: apiKey
     *     in: header
     *     name: X-API-KEY-ID
     *     x-rapiddocs-header-variable-name: apiKeyId
     */
    HEADER_VARIABLE_NAME: "x-rapiddocs-header-variable-name",

    /**
     * The x-rapiddocs-enum allows you to specify docs for the enum value.
     * If your enum is not codegen friendly (not alphanumeric), then you can specify a codegen name as well.
     *
     * MyEnum:
     *   enum:
     *     - VARIANT_ONE
     *     - VARIANT_TWO
     *   x-rapiddocs-enum:
     *     VARIANT_ONE:
     *       description: These are docs about the enum
     *       name: ONE
     */
    RAPIDDOCS_ENUM: "x-rapiddocs-enum",

    /**
     * Used to mark operations with audiences
     *
     * paths:
     *   /path/to/my/endpoint/{id}:
     *     x-rapiddocs-audiences:
     *       - external
     */
    AUDIENCES: "x-rapiddocs-audiences",

    /**
     * Used to tell rapiddocs to ignore endpoints.
     *
     * paths:
     *   /path/to/my/endpoint/{id}:
     *     get:
     *       x-rapiddocs-ignore: true
     */
    IGNORE: "x-rapiddocs-ignore",

    /**
     * paths:
     *  /path/to/my:
     *    get:
     *      x-rapiddocs-availability: ga # or beta, generally-available, deprecated,
     */
    AVAILABILITY: "x-rapiddocs-availability",

    /**
     * Used to signal that the SDK should return a specific property on the response.
     *
     * paths:
     *  /path/to/my:
     *    get:
     *      x-rapiddocs-sdk-return-value: data
     */
    RESPONSE_PROPERTY: "x-rapiddocs-sdk-return-value",

    /**
     * Used to resolve multiple schemas into a single schema. All the references
     * are replaced with a single schema.
     *
     * x-rapiddocs-resolutions:
     *  - name: User
     *    resolutions:
     *      - `#/components/schemas/Group/properties/user`
     *      - `#/components/schemas/User`
     */
    RESOLUTIONS: "x-rapiddocs-resolutions",

    /**
     * paths:
     *  /path/to/my:
     *    get:
     *     x-rapiddocs-examples:
     *      - name: Example 1
     *        docs: This is an example
     *        request: {}
     *        response:
     *          body: {}
     *        code-samples:
     *          - language: typescript
     *            install: npm install my-client
     *            code: |
     *              import { MyClient } from "my-client";
     *              const client = new MyClient();
     *              const response = await client.myEndpoint();
     *              console.log(response);
     *            name: Console Log My Endpoint
     *            description: This is a code sample that logs the response
     */
    EXAMPLES: "x-rapiddocs-examples",

    /**
     * securitySchemes:
     *   Bearer:
     *     scheme: http
     *     type: bearer
     *     x-rapiddocs-bearer:
     *       name: apiKey
     *       env: MY_AUTH_TOKEN
     */
    RAPIDDOCS_BEARER_TOKEN: "x-rapiddocs-bearer",

    /**
     * securitySchemes:
     *   Bearer:
     *     type: apiKey
     *     in: header
     *     name: X-API-KEY-ID
     *     x-rapiddocs-header:
     *       name: header
     *       env: MY_AUTH_TOKEN
     */
    RAPIDDOCS_HEADER_AUTH: "x-rapiddocs-header",

    /**
     * securitySchemes:
     *   Basic:
     *     scheme: http
     *     type: basic
     *     x-rapiddocs-basic:
     *       username:
     *          name: username
     *          env: MY_USERNAME
     *       password:
     *          name: password
     *          env: MY_PASSWORD
     */
    RAPIDDOCS_BASIC_AUTH: "x-rapiddocs-basic",

    /**
     * Allows users to specify which headers are global, and an optional alias for them
     * `header` is the name of the header used throughout your spec, while `name` is the
     * alias you'd like it to appear as within your generated SDK to the consumer.
     *
     * x-rapiddocs-global-headers:
     *  - header: our_api_key
     *    name: api_key
     *    optional: true
     *  - header: telemetry_id
     *    env: MY_ENVVAR
     *  - header: X-API-Version
     *    name: version
     *    type: literal<"2.10"> # The type of the header to use
     */
    RAPIDDOCS_GLOBAL_HEADERS: "x-rapiddocs-global-headers",

    /**
     * Allows users to specify which headers are idempotent.
     *
     * x-rapiddocs-idempotency-headers:
     *  - header: our_api_key
     *    name: api_key
     *    optional: true
     *  - header: telemetry_id
     *    env: MY_ENVVAR
     *  - header: X-API-Version
     *    name: version
     *    type: literal<"2.10"> # The type of the header to use
     */
    RAPIDDOCS_IDEMPOTENCY_HEADERS: "x-rapiddocs-idempotency-headers",

    /**
     * Mark a particular endpoint as idempotent.
     *
     * paths:
     *  send:
     *    post:
     *      x-rapiddocs-idempotent: true
     */
    IDEMPOTENT: "x-rapiddocs-idempotent",

    /**
     * Allows a user to configure the property name for the schema.
     */
    RAPIDDOCS_PROPERTY_NAME: "x-rapiddocs-property-name",

    /**
     * Allows a user to configure that a union with a discriminant should
     * be undiscriminated.
     *
     * Shape:
     *   x-rapiddocs-undiscriminated: true
     *   oneOf:
     *    - $ref: components/schemas/Triangle
     *    - $ref: components/schemas/Square
     */
    IS_UNDISCRIMINATED: "x-rapiddocs-undiscriminated",

    /**
     * Allows users to specify the version scheme supported by the API.
     *
     * x-rapiddocs-version:
     *   header: X-API-Version
     *   default: "2.0"
     *   values:
     *     - "1.0"
     *     - "2.0"
     *     - "Latest"
     */
    RAPIDDOCS_VERSION: "x-rapiddocs-version",

    /**
     * Allows users to specify the encoding of the type. For example, suppose you need to configure
     * Protobuf-encoding details like the following:
     *
     * User:
     *  properties:
     *    username:
     *      type: string
     *  x-rapiddocs-encoding:
     *    proto:
     *      type: user.v1.User
     */
    ENCODING: "x-rapiddocs-encoding",

    /**
     * Allows users to configure gRPC services. This must be specified on individual service
     * declarations.
     *
     * x-rapiddocs-transport:
     *   grpc:
     *     service-name: UserService
     */
    TRANSPORT: "x-rapiddocs-transport"
} as const;

export type RapiddocsOpenAPIExtension = Values<typeof RapiddocsOpenAPIExtension>;
