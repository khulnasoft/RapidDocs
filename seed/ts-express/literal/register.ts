/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import express from "express";
import { HeadersService } from "./api/resources/headers/service/HeadersService";
import { InlinedService } from "./api/resources/inlined/service/InlinedService";
import { PathService } from "./api/resources/path/service/PathService";
import { QueryService } from "./api/resources/query/service/QueryService";
import { ReferenceService } from "./api/resources/reference/service/ReferenceService";

export function register(
    expressApp: express.Express | express.Router,
    services: {
        headers: HeadersService;
        inlined: InlinedService;
        path: PathService;
        query: QueryService;
        reference: ReferenceService;
    },
): void {
    (expressApp as any).use("", services.headers.toRouter());
    (expressApp as any).use("", services.inlined.toRouter());
    (expressApp as any).use("", services.path.toRouter());
    (expressApp as any).use("", services.query.toRouter());
    (expressApp as any).use("", services.reference.toRouter());
}
