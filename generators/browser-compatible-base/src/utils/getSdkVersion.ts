import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

export function getSdkVersion(config: RapiddocsGeneratorExec.GeneratorConfig): string | undefined {
    return config.output.mode._visit<string | undefined>({
        publish: (gpc: RapiddocsGeneratorExec.GeneratorPublishConfig) => gpc.version,
        downloadFiles: () => undefined,
        github: (gom: RapiddocsGeneratorExec.GithubOutputMode) => gom.version,
        _other: () => {
            throw new Error("Unrecognized output mode.");
        }
    });
}
