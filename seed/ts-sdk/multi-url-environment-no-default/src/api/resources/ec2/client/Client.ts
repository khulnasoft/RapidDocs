/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as SeedMultiUrlEnvironmentNoDefault from "../../../index";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as errors from "../../../../errors/index";

export declare namespace Ec2 {
    export interface Options {
        environment: core.Supplier<
            | environments.SeedMultiUrlEnvironmentNoDefaultEnvironment
            | environments.SeedMultiUrlEnvironmentNoDefaultEnvironmentUrls
        >;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        token: core.Supplier<core.BearerToken>;
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

export class Ec2 {
    constructor(protected readonly _options: Ec2.Options) {}

    /**
     * @param {SeedMultiUrlEnvironmentNoDefault.BootInstanceRequest} request
     * @param {Ec2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.ec2.bootInstance({
     *         size: "size"
     *     })
     */
    public async bootInstance(
        request: SeedMultiUrlEnvironmentNoDefault.BootInstanceRequest,
        requestOptions?: Ec2.RequestOptions,
    ): Promise<void> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)).ec2,
                "/ec2/boot",
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Rapiddocs-Language": "JavaScript",
                "X-Rapiddocs-SDK-Name": "@rapiddocs/multi-url-environment-no-default",
                "X-Rapiddocs-SDK-Version": "0.0.1",
                "User-Agent": "@rapiddocs/multi-url-environment-no-default/0.0.1",
                "X-Rapiddocs-Runtime": core.RUNTIME.type,
                "X-Rapiddocs-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.BootInstanceRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedMultiUrlEnvironmentNoDefaultError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedMultiUrlEnvironmentNoDefaultError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedMultiUrlEnvironmentNoDefaultTimeoutError(
                    "Timeout exceeded when calling POST /ec2/boot.",
                );
            case "unknown":
                throw new errors.SeedMultiUrlEnvironmentNoDefaultError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string> {
        return `Bearer ${await core.Supplier.get(this._options.token)}`;
    }
}
