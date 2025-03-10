/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as core from "../../../../core";
import * as SeedApi from "../../../index";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as errors from "../../../../errors/index";

export declare namespace User {
    interface Options {
        environment: core.Supplier<string>;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class User {
    constructor(protected readonly _options: User.Options) {}

    /**
     * @param {SeedApi.CreateUserRequest} request
     * @param {User.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.user.createUser({
     *         username: "string",
     *         email: "string",
     *         age: 1,
     *         weight: 1.1
     *     })
     */
    public async createUser(
        request: SeedApi.CreateUserRequest,
        requestOptions?: User.RequestOptions
    ): Promise<SeedApi.CreateUserResponse> {
        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "/users"),
            method: "POST",
            headers: {
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/grpc",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/grpc/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.CreateUserRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.CreateUserResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedApiError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedApiError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedApiTimeoutError();
            case "unknown":
                throw new errors.SeedApiError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * @param {SeedApi.GetUserRequest} request
     * @param {User.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.user.getUser({
     *         username: "string",
     *         age: 1,
     *         weight: 1.1
     *     })
     */
    public async getUser(
        request: SeedApi.GetUserRequest = {},
        requestOptions?: User.RequestOptions
    ): Promise<SeedApi.User> {
        const { username, age, weight } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (username != null) {
            _queryParams["username"] = username;
        }

        if (age != null) {
            _queryParams["age"] = age.toString();
        }

        if (weight != null) {
            _queryParams["weight"] = weight.toString();
        }

        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "/users"),
            method: "GET",
            headers: {
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/grpc",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/grpc/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.User.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedApiError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedApiError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedApiTimeoutError();
            case "unknown":
                throw new errors.SeedApiError({
                    message: _response.error.errorMessage,
                });
        }
    }
}
