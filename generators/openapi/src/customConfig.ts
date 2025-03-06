import { GeneratorConfig } from "@khulnasoft/base-generator";

export interface RapiddocsOpenapiCustomConfig {
    format: "yaml" | "json";
    customOverrides: Record<string, unknown>;
    filename?: string;
}

const DEFAULT_RAPIDDOCS_OPENAPI_CUSTOM_CONFIG: RapiddocsOpenapiCustomConfig = {
    format: "yaml",
    customOverrides: {},
    filename: "openapi.yml"
};

export function getCustomConfig(generatorConfig: GeneratorConfig): RapiddocsOpenapiCustomConfig {
    if (generatorConfig.customConfig != null) {
        return generatorConfig.customConfig as unknown as RapiddocsOpenapiCustomConfig;
    }
    return DEFAULT_RAPIDDOCS_OPENAPI_CUSTOM_CONFIG;
}
