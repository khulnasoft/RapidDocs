import { RapiddocsGeneratorExec } from "@khulnasoft/browser-compatible-base-generator";
import { BaseGoCustomConfigSchema } from "@khulnasoft/go-ast";

const DEFAULT_CONFIG: RapiddocsGeneratorExec.GeneratorConfig = {
    dryRun: false,
    irFilepath: "<placeholder>",
    output: {
        path: "<placeholder>",
        mode: RapiddocsGeneratorExec.OutputMode.github({
            version: "v1.0.0",
            repoUrl: "https://github.com/acme/acme-go"
        })
    },
    organization: "acme",
    workspaceName: "acme",
    environment: RapiddocsGeneratorExec.GeneratorEnvironment.local(),
    whitelabel: false,
    writeUnitTests: false,
    generateOauthClients: false,
    customConfig: {
        packageName: "acme",
        union: "v1",
        inlineFileProperties: true
    } as BaseGoCustomConfigSchema
};

export function buildGeneratorConfig({
    customConfig
}: { customConfig?: Partial<BaseGoCustomConfigSchema> } = {}): RapiddocsGeneratorExec.GeneratorConfig {
    return {
        ...DEFAULT_CONFIG,
        customConfig: {
            ...(DEFAULT_CONFIG.customConfig as BaseGoCustomConfigSchema),
            ...customConfig
        }
    };
}
