/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as core from "../../../../../../core";
import * as SeedExhaustive from "../../../../../index";
import urlJoin from "url-join";
import * as errors from "../../../../../../errors/index";

export declare namespace Union {
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

export class Union {
    constructor(protected readonly _options: Union.Options) {}

    /**
     * @param {SeedExhaustive.types.Animal} request
     * @param {Union.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.union.getAndReturnUnion({
     *         animal: "dog",
     *         name: "name",
     *         likesToWoof: true
     *     })
     */
    public async getAndReturnUnion(
        request: SeedExhaustive.types.Animal,
        requestOptions?: Union.RequestOptions,
    ): Promise<SeedExhaustive.types.Animal> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                "/union",
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
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return _response.body as SeedExhaustive.types.Animal;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedExhaustiveError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedExhaustiveError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedExhaustiveTimeoutError("Timeout exceeded when calling POST /union.");
            case "unknown":
                throw new errors.SeedExhaustiveError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
