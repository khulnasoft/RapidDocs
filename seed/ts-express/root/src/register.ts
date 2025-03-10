/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import express from "express";
import { RootService } from "./api/service/RootService";
import { ServiceService } from "./api/resources/service/service/ServiceService";

export function register(
    expressApp: express.Express | express.Router,
    services: {
        _root: RootService;
        service: ServiceService;
    }
): void {
    (expressApp as any).use("/", services._root.toRouter());
    (expressApp as any).use("/", services.service.toRouter());
}
