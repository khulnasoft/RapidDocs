/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as core from "../../../../core";
import * as SeedBasicAuthEnvironmentVariables from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace BasicAuth {
    export interface Options {
        environment: core.Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        username?: core.Supplier<string | undefined>;
        accessToken?: core.Supplier<string | undefined>;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}

export class BasicAuth {
    constructor(protected readonly _options: BasicAuth.Options) {}

    /**
     * GET request with basic auth scheme
     *
     * @param {BasicAuth.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link SeedBasicAuthEnvironmentVariables.UnauthorizedRequest}
     *
     * @example
     *     await client.basicAuth.getWithBasicAuth()
     */
    public async getWithBasicAuth(requestOptions?: BasicAuth.RequestOptions): Promise<boolean> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                "basic-auth",
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/basic-auth-environment-variables",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/basic-auth-environment-variables/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.basicAuth.getWithBasicAuth.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 401:
                    throw new SeedBasicAuthEnvironmentVariables.UnauthorizedRequest(
                        serializers.UnauthorizedRequestErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.SeedBasicAuthEnvironmentVariablesError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedBasicAuthEnvironmentVariablesError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedBasicAuthEnvironmentVariablesTimeoutError(
                    "Timeout exceeded when calling GET /basic-auth.",
                );
            case "unknown":
                throw new errors.SeedBasicAuthEnvironmentVariablesError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * POST request with basic auth scheme
     *
     * @param {unknown} request
     * @param {BasicAuth.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link SeedBasicAuthEnvironmentVariables.UnauthorizedRequest}
     * @throws {@link SeedBasicAuthEnvironmentVariables.BadRequest}
     *
     * @example
     *     await client.basicAuth.postWithBasicAuth({
     *         "key": "value"
     *     })
     */
    public async postWithBasicAuth(request?: unknown, requestOptions?: BasicAuth.RequestOptions): Promise<boolean> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                "basic-auth",
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/basic-auth-environment-variables",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/basic-auth-environment-variables/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.basicAuth.postWithBasicAuth.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 401:
                    throw new SeedBasicAuthEnvironmentVariables.UnauthorizedRequest(
                        serializers.UnauthorizedRequestErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                case 400:
                    throw new SeedBasicAuthEnvironmentVariables.BadRequest();
                default:
                    throw new errors.SeedBasicAuthEnvironmentVariablesError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedBasicAuthEnvironmentVariablesError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedBasicAuthEnvironmentVariablesTimeoutError(
                    "Timeout exceeded when calling POST /basic-auth.",
                );
            case "unknown":
                throw new errors.SeedBasicAuthEnvironmentVariablesError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const username = (await core.Supplier.get(this._options.username)) ?? process?.env["USERNAME"];
        if (username == null) {
            throw new errors.SeedBasicAuthEnvironmentVariablesError({
                message:
                    "Please specify a username by either passing it in to the constructor or initializing a USERNAME environment variable",
            });
        }

        const accessToken = (await core.Supplier.get(this._options.accessToken)) ?? process?.env["PASSWORD"];
        if (accessToken == null) {
            throw new errors.SeedBasicAuthEnvironmentVariablesError({
                message:
                    "Please specify a accessToken by either passing it in to the constructor or initializing a PASSWORD environment variable",
            });
        }

        return core.BasicAuth.toAuthorizationHeader({
            username: username,
            password: accessToken,
        });
    }
}
