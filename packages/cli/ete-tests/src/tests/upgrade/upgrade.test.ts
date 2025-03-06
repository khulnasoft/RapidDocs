import { readFile, writeFile } from "fs/promises";
import yaml from "js-yaml";

import { RAPIDDOCS_DIRECTORY, GENERATORS_CONFIGURATION_FILENAME, generatorsYml } from "@khulnasoft/configuration";
import { RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";
import { init } from "../init/init";

const GENERATORS_CONFIGURATION: generatorsYml.GeneratorsConfigurationSchema = {
    groups: {
        internal: {
            generators: [
                {
                    name: "rapiddocsapi/rapiddocs-postman",
                    version: "0.0.15",
                    output: {
                        location: "local-file-system",
                        path: "./generated-postman"
                    }
                },
                {
                    name: "rapiddocsapi/rapiddocs-openapi",
                    version: "0.0.3",
                    output: {
                        location: "local-file-system",
                        path: "./generated-openapi"
                    },
                    config: {
                        format: "yaml"
                    }
                },
                {
                    name: "rapiddocsapi/rapiddocs-java-sdk",
                    version: "0.0.50",
                    output: {
                        location: "maven",
                        coordinate: ""
                    }
                },
                {
                    name: "rapiddocsapi/rapiddocs-typescript-sdk",
                    version: "0.0.11",
                    output: {
                        location: "npm",
                        "package-name": ""
                    }
                }
            ]
        },
        external: {
            generators: [
                {
                    name: "rapiddocsapi/rapiddocs-postman",
                    version: "0.0.20",
                    output: {
                        location: "local-file-system",
                        path: "./generated-postman"
                    }
                },
                {
                    name: "rapiddocsapi/rapiddocs-openapi",
                    version: "0.0.2",
                    output: {
                        location: "local-file-system",
                        path: "./generated-openapi"
                    },
                    config: {
                        format: "yaml"
                    }
                },
                {
                    name: "rapiddocsapi/rapiddocs-java-sdk",
                    version: "0.0.81",
                    output: {
                        location: "maven",
                        coordinate: ""
                    }
                },
                {
                    name: "rapiddocsapi/rapiddocs-typescript-sdk",
                    version: "0.0.14",
                    output: {
                        location: "npm",
                        "package-name": ""
                    }
                }
            ]
        }
    }
};

describe("rapiddocs upgrade", () => {
    it("upgrades generators", async () => {
        const directory = await init();
        const generatorsConfigurationFilepath = join(
            directory,
            RelativeFilePath.of(RAPIDDOCS_DIRECTORY),
            RelativeFilePath.of(GENERATORS_CONFIGURATION_FILENAME)
        );
        // make sure the file exists
        await readFile(generatorsConfigurationFilepath);
        await writeFile(generatorsConfigurationFilepath, yaml.dump(GENERATORS_CONFIGURATION));
        await runRapiddocsCli(["upgrade"], {
            cwd: directory,
            env: {
                // this env var needs to be defined so the CLI thinks we're mid-upgrade
                RAPIDDOCS_PRE_UPGRADE_VERSION: "0.0.0"
            }
        });
        const generatorsConfiguration = (await readFile(generatorsConfigurationFilepath)).toString();
        expect(generatorsConfiguration).toMatchSnapshot();
    }, 90_000);
});
