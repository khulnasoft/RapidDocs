/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import express from "express";

export abstract class SeedApiError extends Error {
    constructor(public readonly errorName?: string) {
        super();
        Object.setPrototypeOf(this, SeedApiError.prototype);
    }

    public abstract send(res: express.Response): Promise<void>;
}
