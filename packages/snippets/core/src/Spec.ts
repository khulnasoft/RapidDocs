import { OpenAPI as OpenAPITypes } from "openapi-types";

import { OpenAPIWorkspace } from "@khulnasoft/browser-compatible-rapiddocs-workspace";

export type Spec = OpenAPISpec;

export interface OpenAPISpec {
    type: "openapi";
    openapi: OpenAPITypes.Document;
    overrides?: Partial<OpenAPITypes.Document>;
    settings?: OpenAPIWorkspace.Settings;
}
