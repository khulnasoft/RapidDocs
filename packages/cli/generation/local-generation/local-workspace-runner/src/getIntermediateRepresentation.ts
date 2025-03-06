import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { Audiences, generatorsYml } from "@khulnasoft/configuration";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import {
    migrateIntermediateRepresentationForGenerator,
    migrateIntermediateRepresentationThroughVersion
} from "@khulnasoft/ir-migrations";
import { IntermediateRepresentation, SourceConfig } from "@khulnasoft/ir-sdk";
import { TaskContext } from "@khulnasoft/task-context";

export declare namespace getIntermediateRepresentation {
    interface Return {
        latest: IntermediateRepresentation;
        migrated: unknown;
    }
}

export async function getIntermediateRepresentation({
    workspace,
    audiences,
    generatorInvocation,
    context,
    irVersionOverride,
    version,
    packageName,
    sourceConfig,
    includeOptionalRequestPropertyExamples
}: {
    workspace: RapiddocsWorkspace;
    audiences: Audiences;
    generatorInvocation: generatorsYml.GeneratorInvocation;
    context: TaskContext;
    irVersionOverride: string | undefined;
    version: string | undefined;
    packageName: string | undefined;
    sourceConfig: SourceConfig | undefined;
    includeOptionalRequestPropertyExamples?: boolean;
}): Promise<getIntermediateRepresentation.Return> {
    const intermediateRepresentation = generateIntermediateRepresentation({
        workspace,
        audiences,
        generationLanguage: generatorInvocation.language,
        keywords: generatorInvocation.keywords,
        smartCasing: generatorInvocation.smartCasing,
        exampleGeneration: { includeOptionalRequestPropertyExamples, disabled: generatorInvocation.disableExamples },
        readme: generatorInvocation.readme,
        version,
        packageName,
        context,
        sourceResolver: new SourceResolverImpl(context, workspace),
        includeDynamicExamples: true
    });
    if (sourceConfig != null) {
        intermediateRepresentation.sourceConfig = sourceConfig;
    }
    context.logger.debug("Generated IR");
    const migratedIntermediateRepresentation =
        irVersionOverride != null
            ? await migrateIntermediateRepresentationThroughVersion({
                  intermediateRepresentation,
                  context,
                  version: irVersionOverride
              })
            : await migrateIntermediateRepresentationForGenerator({
                  intermediateRepresentation,
                  context,
                  targetGenerator: {
                      name: generatorInvocation.name,
                      version: generatorInvocation.version
                  }
              });
    return {
        latest: intermediateRepresentation,
        migrated: migratedIntermediateRepresentation
    };
}
