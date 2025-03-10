/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as core from "./core";
import { Svc } from "./api/resources/svc/client/Client";

export declare namespace SeedApiClient {
    interface Options {
        environment: core.Supplier<string>;
        token?: core.Supplier<core.BearerToken | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class SeedApiClient {
    constructor(protected readonly _options: SeedApiClient.Options) {}

    protected _svc: Svc | undefined;

    public get svc(): Svc {
        return (this._svc ??= new Svc(this._options));
    }
}
