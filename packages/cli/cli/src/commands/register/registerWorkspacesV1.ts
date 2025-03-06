import axios from "axios";
import { readFile } from "fs/promises";
import path from "path";
import { create as createTar } from "tar";
import tmp from "tmp-promise";

import { RapiddocsToken, createOrganizationIfDoesNotExist } from "@khulnasoft/auth";
import { createFiddleService } from "@khulnasoft/core";
import { YAML_SCHEMA_VERSION } from "@khulnasoft/rapiddocs-definition-schema";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Project } from "@khulnasoft/project-loader";

import { RapiddocsFiddle } from "@rapiddocs-rapiddocs/fiddle-sdk";

import { CliContext } from "../../cli-context/CliContext";

export async function registerWorkspacesV1({
    project,
    cliContext,
    token,
    version
}: {
    project: Project;
    cliContext: CliContext;
    token: RapiddocsToken;
    version: string | undefined;
}): Promise<void> {
    if (token.type === "user") {
        await cliContext.runTask(async (context) => {
            await createOrganizationIfDoesNotExist({
                organization: project.config.organization,
                token,
                context
            });
        });
    }

    const fiddle = createFiddleService({ token: token.value });
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                if (workspace instanceof OSSWorkspace) {
                    context.failWithoutThrowing("Registering from OpenAPI not currently supported.");
                    return;
                }
                const resolvedWorkspace = await workspace.toRapiddocsWorkspace({ context });
                const registerApiResponse = await fiddle.definitionRegistry.registerUsingOrgToken({
                    apiId: RapiddocsFiddle.ApiId(resolvedWorkspace.definition.rootApiFile.contents.name),
                    version,
                    cliVersion: cliContext.environment.packageVersion,
                    yamlSchemaVersion: `${YAML_SCHEMA_VERSION}`
                });
                if (!registerApiResponse.ok) {
                    registerApiResponse.error._visit({
                        versionAlreadyExists: () => {
                            context.failAndThrow(`Version ${version ?? ""} is already registered`);
                        },
                        _other: (value) => {
                            context.failAndThrow("Failed to register", value);
                        }
                    });
                    return;
                }

                const tmpDir = await tmp.dir();
                const tarPath = path.join(tmpDir.path, "definition.tgz");

                context.logger.debug(`Compressing definition at ${tmpDir.path}`);
                await createTar({ file: tarPath, cwd: resolvedWorkspace.absoluteFilePath }, ["."]);

                context.logger.info("Uploading definition...");
                await axios.put(registerApiResponse.body.definitionS3UploadUrl, await readFile(tarPath));

                context.logger.info(
                    `Registered @${project.config.organization}/${resolvedWorkspace.definition.rootApiFile.contents.name}:${registerApiResponse.body.version}`
                );
            });
        })
    );
}
