/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import express from "express";

export abstract class SeedAliasError extends Error {
    constructor(public readonly errorName?: string) {
        super();
        Object.setPrototypeOf(this, SeedAliasError.prototype);
    }

    public abstract send(res: express.Response): Promise<void>;
}
