/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import express from "express";
import { DummyService } from "./api/resources/dummy/service/DummyService";

export function register(
    expressApp: express.Express | express.Router,
    services: {
        dummy: DummyService;
    },
): void {
    (expressApp as any).use("", services.dummy.toRouter());
}
