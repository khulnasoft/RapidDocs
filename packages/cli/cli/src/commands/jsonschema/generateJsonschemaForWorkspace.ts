import chalk from "chalk";
import { mkdir, writeFile } from "fs/promises";

import { constructCasingsGenerator } from "@khulnasoft/casings-generator";
import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { RAPIDDOCS_PACKAGE_MARKER_FILENAME } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, RelativeFilePath, dirname, doesPathExist } from "@khulnasoft/fs-utils";
import { IdGenerator, convertToRapiddocsFilepath, generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { convertIRtoJsonSchema } from "@khulnasoft/ir-to-jsonschema";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";

export async function generateJsonschemaForWorkspaces({
    typeLocator,
    project,
    jsonschemaFilepath,
    cliContext
}: {
    // e.g. "MySchema" or "mypackage.MySchema"
    typeLocator: string;
    project: Project;
    jsonschemaFilepath: AbsoluteFilePath;
    cliContext: CliContext;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({ context });

                const intermediateRepresentation = generateIntermediateRepresentation({
                    workspace: rapiddocsWorkspace,
                    context,
                    generationLanguage: undefined,
                    audiences: { type: "all" },
                    keywords: undefined,
                    smartCasing: false,
                    exampleGeneration: { disabled: true },
                    version: undefined,
                    packageName: undefined,
                    readme: undefined,
                    sourceResolver: new SourceResolverImpl(context, rapiddocsWorkspace)
                });

                const splitTypeLocator = typeLocator.split(".");
                const casingsGenerator = constructCasingsGenerator({
                    generationLanguage: undefined,
                    keywords: undefined,
                    smartCasing: false
                });
                const typeName = splitTypeLocator[splitTypeLocator.length - 1] ?? typeLocator;
                const relativeFilepath =
                    splitTypeLocator.length > 1
                        ? `${splitTypeLocator.slice(0, -1).join("/")}.yml`
                        : RAPIDDOCS_PACKAGE_MARKER_FILENAME;
                const typeId = IdGenerator.generateTypeId({
                    rapiddocsFilepath: convertToRapiddocsFilepath({
                        relativeFilepath: RelativeFilePath.of(`${splitTypeLocator.slice(0, -1).join("/")}.yml`),
                        casingsGenerator
                    }),
                    name: casingsGenerator.generateName(typeName)
                });

                const jsonSchema = convertIRtoJsonSchema({
                    ir: intermediateRepresentation,
                    typeName,
                    typeId,
                    context
                });

                if (!(await doesPathExist(dirname(jsonschemaFilepath)))) {
                    await mkdir(dirname(jsonschemaFilepath), { recursive: true });
                }
                await writeFile(jsonschemaFilepath, JSON.stringify(jsonSchema, null, 2));

                context.logger.info(chalk.green(`Wrote JSON Schema to ${jsonschemaFilepath}`));
            });
        })
    );
}
