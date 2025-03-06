import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

export function getPackageName(config: RapiddocsGeneratorExec.GeneratorConfig): string | undefined {
    return config.output.mode._visit<string | undefined>({
        publish: (gpc: RapiddocsGeneratorExec.GeneratorPublishConfig) =>
            gpc.publishTarget?._visit({
                maven: (mrc: RapiddocsGeneratorExec.MavenRegistryConfigV2) => mrc.coordinate,
                npm: (nrc: RapiddocsGeneratorExec.NpmRegistryConfigV2) => nrc.packageName,
                pypi: (prc: RapiddocsGeneratorExec.PypiRegistryConfig) => prc.packageName,
                rubygems: (rgrc: RapiddocsGeneratorExec.RubyGemsRegistryConfig) => rgrc.packageName,
                nuget: (nrc: RapiddocsGeneratorExec.NugetRegistryConfig) => nrc.packageName,
                postman: () => undefined,
                _other: () => undefined
            }),
        downloadFiles: () => undefined,
        github: (gom: RapiddocsGeneratorExec.GithubOutputMode) =>
            gom.publishInfo?._visit({
                maven: (mrc: RapiddocsGeneratorExec.MavenGithubPublishInfo) => mrc.coordinate,
                npm: (nrc: RapiddocsGeneratorExec.NpmGithubPublishInfo) => nrc.packageName,
                pypi: (prc: RapiddocsGeneratorExec.PypiGithubPublishInfo) => prc.packageName,
                rubygems: (rgrc: RapiddocsGeneratorExec.RubyGemsGithubPublishInfo) => rgrc.packageName,
                nuget: (nrc: RapiddocsGeneratorExec.NugetGithubPublishInfo) => nrc.packageName,
                postman: () => undefined,
                _other: () => undefined
            }),
        _other: () => {
            throw new Error("Unrecognized output mode.");
        }
    });
}
