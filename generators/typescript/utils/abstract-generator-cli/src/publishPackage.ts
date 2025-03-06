import { NpmPackage, PersistedTypescriptProject } from "@rapiddocs-typescript/commons";

import { GeneratorNotificationService } from "@khulnasoft/base-generator";
import { Logger } from "@khulnasoft/logger";

import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";

export async function publishPackage({
    generatorNotificationService,
    logger,
    npmPackage,
    dryRun,
    typescriptProject,
    shouldTolerateRepublish
}: {
    generatorNotificationService: GeneratorNotificationService;
    logger: Logger;
    npmPackage: NpmPackage | undefined;
    dryRun: boolean;
    typescriptProject: PersistedTypescriptProject;
    shouldTolerateRepublish: boolean;
}): Promise<void> {
    if (npmPackage?.publishInfo == null) {
        throw new Error("npmPackage.publishInfo is not defined.");
    }

    const packageCoordinate = RapiddocsGeneratorExec.PackageCoordinate.npm({
        name: npmPackage.packageName,
        version: npmPackage.version
    });

    await generatorNotificationService.sendUpdate(RapiddocsGeneratorExec.GeneratorUpdate.publishing(packageCoordinate));

    await typescriptProject.publish({
        logger,
        dryRun,
        publishInfo: npmPackage.publishInfo,
        shouldTolerateRepublish
    });

    await generatorNotificationService.sendUpdate(RapiddocsGeneratorExec.GeneratorUpdate.published(packageCoordinate));
}
