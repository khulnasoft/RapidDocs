import { RapiddocsFilepath } from "@khulnasoft/ir-sdk";

export function isRootRapiddocsFilepath({ rapiddocsFilePath }: { rapiddocsFilePath: RapiddocsFilepath }): boolean {
    return rapiddocsFilePath.packagePath.length === 0 && rapiddocsFilePath.file == null;
}
