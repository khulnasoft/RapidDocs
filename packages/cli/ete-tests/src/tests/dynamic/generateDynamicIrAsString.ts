import { readFile, rm } from "fs/promises";

import { generatorsYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";

export async function generateDynamicIrAsString({
    fixturePath,
    language,
    audiences,
    apiName,
    version
}: {
    fixturePath: AbsoluteFilePath;
    language?: generatorsYml.GenerationLanguage;
    audiences?: string[];
    apiName?: string;
    version?: string;
}): Promise<string> {
    const dynamicOutputPath = join(fixturePath, RelativeFilePath.of("dynamic.json"));
    await rm(dynamicOutputPath, { force: true, recursive: true });

    const command = ["dynamic-ir", dynamicOutputPath];
    if (language != null) {
        command.push("--language", language);
    }
    if (audiences != null) {
        command.push("--audience");
        for (const audience of audiences) {
            command.push(audience);
        }
    }
    if (apiName != null) {
        command.push("--api", apiName);
    }
    if (version != null) {
        command.push("--version", version);
    }

    await runRapiddocsCli(command, {
        cwd: fixturePath
    });

    const dynamicContents = await readFile(dynamicOutputPath);
    return dynamicContents.toString();
}
