import { createOrganizationIfDoesNotExist } from "@khulnasoft/auth";
import { filterOssWorkspaces } from "@khulnasoft/docs-resolver";
import { askToLogin } from "@khulnasoft/login";
import { Project } from "@khulnasoft/project-loader";
import { runRemoteGenerationForDocsWorkspace } from "@khulnasoft/remote-workspace-runner";
import { RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { CliContext } from "../../cli-context/CliContext";
import { validateDocsWorkspaceAndLogIssues } from "../validate/validateDocsWorkspaceAndLogIssues";

export async function generateDocsWorkspace({
    project,
    cliContext,
    instance,
    preview
}: {
    project: Project;
    cliContext: CliContext;
    instance: string | undefined;
    preview: boolean;
}): Promise<void> {
    const docsWorkspace = project.docsWorkspaces;
    if (docsWorkspace == null) {
        return;
    }

    const token = await cliContext.runTask(async (context) => {
        return askToLogin(context);
    });

    if (token.type === "user") {
        await cliContext.runTask(async (context) => {
            await createOrganizationIfDoesNotExist({
                organization: project.config.organization,
                token,
                context
            });
        });
    }

    await cliContext.instrumentPostHogEvent({
        orgId: project.config.organization,
        command: "rapiddocs generate --docs"
    });

    await cliContext.runTaskForWorkspace(docsWorkspace, async (context) => {
        let rapiddocsWorkspaces: RapiddocsWorkspace[] = [];
        if (!docsWorkspace.config.experimental?.openapiParserV3) {
            rapiddocsWorkspaces = await Promise.all(
                project.apiWorkspaces.map(async (workspace) => {
                    return workspace.toRapiddocsWorkspace(
                        { context },
                        { enableUniqueErrorsPerEndpoint: true, detectGlobalHeaders: false, preserveSchemaIds: true }
                    );
                })
            );
        }

        await validateDocsWorkspaceAndLogIssues({
            workspace: docsWorkspace,
            context,
            logWarnings: false,
            rapiddocsWorkspaces,
            ossWorkspaces: await filterOssWorkspaces(project),
            errorOnBrokenLinks: false
        });

        const ossWorkspaces = await filterOssWorkspaces(project);

        await runRemoteGenerationForDocsWorkspace({
            organization: project.config.organization,
            rapiddocsWorkspaces,
            ossWorkspaces,
            docsWorkspace,
            context,
            token,
            instanceUrl: instance,
            preview
        });
    });
}
