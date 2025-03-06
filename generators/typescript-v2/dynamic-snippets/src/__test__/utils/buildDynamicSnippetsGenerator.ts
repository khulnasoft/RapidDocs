import { readFileSync } from "fs";

import { RapiddocsGeneratorExec } from "@khulnasoft/browser-compatible-base-generator";
import { AbsoluteFilePath } from "@khulnasoft/path-utils";

import { DynamicSnippetsGenerator } from "../../DynamicSnippetsGenerator";

export function buildDynamicSnippetsGenerator({
    irFilepath,
    config
}: {
    irFilepath: AbsoluteFilePath;
    config: RapiddocsGeneratorExec.GeneratorConfig;
}): DynamicSnippetsGenerator {
    const content = readFileSync(irFilepath, "utf-8");
    const ir = JSON.parse(content);
    return new DynamicSnippetsGenerator({ ir, config });
}
