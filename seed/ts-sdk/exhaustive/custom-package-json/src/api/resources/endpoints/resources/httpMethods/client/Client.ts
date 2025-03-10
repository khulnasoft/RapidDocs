/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as core from "../../../../../../core";
import * as Fiddle from "../../../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization/index";

export declare namespace HttpMethods {
    export interface Options {
        environment: core.Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        token?: core.Supplier<core.BearerToken | undefined>;
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

export class HttpMethods {
    constructor(protected readonly _options: HttpMethods.Options) {}

    /**
     * @param {string} id
     * @param {HttpMethods.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.httpMethods.testGet("id")
     */
    public async testGet(
        id: string,
        requestOptions?: HttpMethods.RequestOptions,
    ): Promise<core.APIResponse<string, Fiddle.endpoints.httpMethods.testGet.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                `/http-methods/${encodeURIComponent(id)}`,
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/exhaustive",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/exhaustive/0.0.1",
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
            return {
                ok: true,
                body: serializers.endpoints.httpMethods.testGet.Response.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                }),
            };
        }

        return {
            ok: false,
            error: Fiddle.endpoints.httpMethods.testGet.Error._unknown(_response.error),
        };
    }

    /**
     * @param {Fiddle.types.ObjectWithRequiredField} request
     * @param {HttpMethods.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.httpMethods.testPost({
     *         string: "string"
     *     })
     */
    public async testPost(
        request: Fiddle.types.ObjectWithRequiredField,
        requestOptions?: HttpMethods.RequestOptions,
    ): Promise<core.APIResponse<Fiddle.types.ObjectWithOptionalField, Fiddle.endpoints.httpMethods.testPost.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                "/http-methods",
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/exhaustive",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/exhaustive/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.types.ObjectWithRequiredField.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: serializers.types.ObjectWithOptionalField.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                }),
            };
        }

        return {
            ok: false,
            error: Fiddle.endpoints.httpMethods.testPost.Error._unknown(_response.error),
        };
    }

    /**
     * @param {string} id
     * @param {Fiddle.types.ObjectWithRequiredField} request
     * @param {HttpMethods.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.httpMethods.testPut("id", {
     *         string: "string"
     *     })
     */
    public async testPut(
        id: string,
        request: Fiddle.types.ObjectWithRequiredField,
        requestOptions?: HttpMethods.RequestOptions,
    ): Promise<core.APIResponse<Fiddle.types.ObjectWithOptionalField, Fiddle.endpoints.httpMethods.testPut.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                `/http-methods/${encodeURIComponent(id)}`,
            ),
            method: "PUT",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/exhaustive",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/exhaustive/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.types.ObjectWithRequiredField.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: serializers.types.ObjectWithOptionalField.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                }),
            };
        }

        return {
            ok: false,
            error: Fiddle.endpoints.httpMethods.testPut.Error._unknown(_response.error),
        };
    }

    /**
     * @param {string} id
     * @param {Fiddle.types.ObjectWithOptionalField} request
     * @param {HttpMethods.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.httpMethods.testPatch("id", {
     *         string: "string",
     *         integer: 1,
     *         long: 1000000,
     *         double: 1.1,
     *         bool: true,
     *         datetime: "2024-01-15T09:30:00Z",
     *         date: "2023-01-15",
     *         uuid: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
     *         base64: "SGVsbG8gd29ybGQh",
     *         list: ["list", "list"],
     *         set: new Set(["set"]),
     *         map: {
     *             1: "map"
     *         },
     *         bigint: "1000000"
     *     })
     */
    public async testPatch(
        id: string,
        request: Fiddle.types.ObjectWithOptionalField,
        requestOptions?: HttpMethods.RequestOptions,
    ): Promise<core.APIResponse<Fiddle.types.ObjectWithOptionalField, Fiddle.endpoints.httpMethods.testPatch.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                `/http-methods/${encodeURIComponent(id)}`,
            ),
            method: "PATCH",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/exhaustive",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/exhaustive/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.types.ObjectWithOptionalField.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: serializers.types.ObjectWithOptionalField.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                }),
            };
        }

        return {
            ok: false,
            error: Fiddle.endpoints.httpMethods.testPatch.Error._unknown(_response.error),
        };
    }

    /**
     * @param {string} id
     * @param {HttpMethods.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.httpMethods.testDelete("id")
     */
    public async testDelete(
        id: string,
        requestOptions?: HttpMethods.RequestOptions,
    ): Promise<core.APIResponse<boolean, Fiddle.endpoints.httpMethods.testDelete.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                `/http-methods/${encodeURIComponent(id)}`,
            ),
            method: "DELETE",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/exhaustive",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/exhaustive/0.0.1",
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
            return {
                ok: true,
                body: serializers.endpoints.httpMethods.testDelete.Response.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                }),
            };
        }

        return {
            ok: false,
            error: Fiddle.endpoints.httpMethods.testDelete.Error._unknown(_response.error),
        };
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
