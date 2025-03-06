import { ProtobufFile } from "@khulnasoft/ir-sdk";
import { ResolvedSource } from "@khulnasoft/source-resolver";

export function convertProtobufFile({ source }: { source: ResolvedSource.Protobuf }): ProtobufFile {
    return {
        filepath: source.relativeFilePath,
        packageName: source.packageName,
        options:
            source.csharpNamespace != null
                ? {
                      csharp: {
                          namespace: source.csharpNamespace
                      }
                  }
                : undefined
    };
}
