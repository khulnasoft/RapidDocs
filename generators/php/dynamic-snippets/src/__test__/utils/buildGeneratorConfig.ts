import { RapiddocsGeneratorExec } from "@khulnasoft/browser-compatible-base-generator";
import { BasePhpCustomConfigSchema } from "@khulnasoft/php-codegen";

const DEFAULT_CONFIG: RapiddocsGeneratorExec.GeneratorConfig = {
    dryRun: false,
    irFilepath: "<placeholder>",
    output: {
        path: "<placeholder>",
        mode: RapiddocsGeneratorExec.OutputMode.github({
            version: "v1.0.0",
            repoUrl: "https://github.com/acme/acme-php"
        })
    },
    organization: "acme",
    workspaceName: "acme",
    environment: RapiddocsGeneratorExec.GeneratorEnvironment.local(),
    whitelabel: false,
    writeUnitTests: false,
    generateOauthClients: false,
    customConfig: {
        namespace: "Acme"
    } as BasePhpCustomConfigSchema
};

export function buildGeneratorConfig({
    customConfig
}: { customConfig?: Partial<BasePhpCustomConfigSchema> } = {}): RapiddocsGeneratorExec.GeneratorConfig {
    return {
        ...DEFAULT_CONFIG,
        customConfig: {
            ...(DEFAULT_CONFIG.customConfig as BasePhpCustomConfigSchema),
            ...customConfig
        }
    };
}
