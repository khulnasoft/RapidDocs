import { ParseOpenAPIOptions } from "@khulnasoft/openapi-ir-parser";
import { ConvertOpenAPIOptions } from "@khulnasoft/openapi-ir-to-rapiddocs";

export type OpenAPISettings = ParseOpenAPIOptions & ConvertOpenAPIOptions;
