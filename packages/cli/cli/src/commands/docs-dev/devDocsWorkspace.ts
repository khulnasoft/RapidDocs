import { runPreviewServer } from "@khulnasoft/docs-preview";
import { filterOssWorkspaces } from "@khulnasoft/docs-resolver";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";
import { validateAPIWorkspaceWithoutExiting } from "../validate/validateAPIWorkspaceAndLogIssues";
import { validateDocsWorkspaceWithoutExiting } from "../validate/validateDocsWorkspaceAndLogIssues";

export async function previewDocsWorkspace({
    loadProject,
    cliContext,
    port,
    bundlePath,
    brokenLinks
}: {
    loadProject: () => Promise<Project>;
    cliContext: CliContext;
    port: number;
    bundlePath?: string;
    brokenLinks: boolean;
}): Promise<void> {
    const project = await loadProject();
    const docsWorkspace = project.docsWorkspaces;
    if (docsWorkspace == null) {
        return;
    }

    await cliContext.instrumentPostHogEvent({
        orgId: project.config.organization,
        command: "rapiddocs docs dev"
    });

    await cliContext.runTaskForWorkspace(docsWorkspace, async (context) => {
        context.logger.info(`Starting server on port ${port}`);

        await runPreviewServer({
            initialProject: project,
            reloadProject: loadProject,
            validateProject: async (project) => {
                const docsWorkspace = project.docsWorkspaces;
                if (docsWorkspace == null) {
                    return;
                }
                const excludeRules = brokenLinks ? [] : ["valid-markdown-links"];
                if (docsWorkspace.config.experimental?.openapiParserV3) {
                    await validateDocsWorkspaceWithoutExiting({
                        workspace: docsWorkspace,
                        context,
                        logWarnings: true,
                        logSummary: false,
                        rapiddocsWorkspaces: [],
                        ossWorkspaces: await filterOssWorkspaces(project),
                        excludeRules
                    });
                } else {
                    const rapiddocsWorkspaces = await Promise.all(
                        project.apiWorkspaces.map(async (workspace) => {
                            return workspace.toRapiddocsWorkspace({ context });
                        })
                    );
                    await validateDocsWorkspaceWithoutExiting({
                        workspace: docsWorkspace,
                        context,
                        logWarnings: true,
                        logSummary: false,
                        rapiddocsWorkspaces,
                        ossWorkspaces: await filterOssWorkspaces(project),
                        excludeRules
                    });
                    for (const rapiddocsWorkspace of rapiddocsWorkspaces) {
                        await cliContext.runTaskForWorkspace(rapiddocsWorkspace, async (apiWorkspaceContext) => {
                            await validateAPIWorkspaceWithoutExiting({
                                workspace: rapiddocsWorkspace,
                                context: apiWorkspaceContext,
                                logWarnings: false,
                                logSummary: false
                            });
                        });
                    }
                }
            },
            context,
            port,
            bundlePath
        });
    });
}
