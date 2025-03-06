import { Values } from "@khulnasoft/core-utils";

export const RapiddocsAsyncAPIExtension = {
    /**
     * The x-rapiddocs-optional allows you to specify that a channel parameter is optional.
     *
     * parameters:
     *   MyChannelParam:
     *     description: This is a description of the parameter
     *     x-rapiddocs-optional: true
     */
    RAPIDDOCS_PARAMETER_OPTIONAL: "x-rapiddocs-optional",

    /**
     * The x-rapiddocs-address allows you to specify the address for the websocket channel.
     * Used in v2.x.x specs to specify the address for a websocket channel when the channel
     * name is not the same as the address.
     *
     * channels:
     *   /my-channel:
     *     x-rapiddocs-address: /get-user
     */
    RAPIDDOCS_CHANNEL_ADDRESS: "x-rapiddocs-address",

    /**
     * The x-rapiddocs-summary allows you to specify a display name for the websocket channel.
     */
    RAPIDDOCS_DISPLAY_NAME: "x-rapiddocs-display-name",

    /**
     * The x-rapiddocs-sdk-group-name allows you to specify the SDK group name for the websocket channel.
     */
    RAPIDDOCS_SDK_GROUP_NAME: "x-rapiddocs-sdk-group-name",

    /**
     * The x-rapiddocs-examples allows you to specify examples for the websocket session.
     *
     * channels:
     *   /my-channel:
     *      subscribe:
     *        ...
     *
     *      x-rapiddocs-examples:
     *       - name: example-1
     *         summary: This is an example of a websocket session
     *         description: This is a description of the example
     *         messages:
     *           - type: publish
     *             messageId: SendMessage
     *             value:
     *               data: "1223233"
     *           - type: subscribe
     *             messageId: ReceiveMessage
     *             value:
     *              data: "12340213"
     */
    RAPIDDOCS_EXAMPLES: "x-rapiddocs-examples",

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
     * Used to tell rapiddocs to ignore channels.
     *
     * channels:
     *   /my-channel:
     *     x-rapiddocs-ignore: true
     */
    IGNORE: "x-rapiddocs-ignore"
} as const;

export type RapiddocsAsyncAPIExtension = Values<typeof RapiddocsAsyncAPIExtension>;
