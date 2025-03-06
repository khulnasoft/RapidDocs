import { filterOssWorkspaces } from "@khulnasoft/docs-resolver";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";
import { validateAPIWorkspaceAndLogIssues } from "./validateAPIWorkspaceAndLogIssues";
import { validateDocsWorkspaceAndLogIssues } from "./validateDocsWorkspaceAndLogIssues";

export async function validateWorkspaces({
    project,
    cliContext,
    logWarnings,
    brokenLinks,
    errorOnBrokenLinks
}: {
    project: Project;
    cliContext: CliContext;
    logWarnings: boolean;
    brokenLinks: boolean;
    errorOnBrokenLinks: boolean;
}): Promise<void> {
    const docsWorkspace = project.docsWorkspaces;
    if (docsWorkspace != null) {
        await cliContext.runTaskForWorkspace(docsWorkspace, async (context) => {
            const excludeRules = brokenLinks || errorOnBrokenLinks ? [] : ["valid-markdown-links"];
            await validateDocsWorkspaceAndLogIssues({
                workspace: docsWorkspace,
                context,
                logWarnings,
                rapiddocsWorkspaces: await Promise.all(
                    project.apiWorkspaces.map(async (workspace) => {
                        return workspace.toRapiddocsWorkspace({ context });
                    })
                ),
                ossWorkspaces: await filterOssWorkspaces(project),
                errorOnBrokenLinks,
                excludeRules
            });
        });
    }

    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({ context });
                await validateAPIWorkspaceAndLogIssues({
                    workspace: rapiddocsWorkspace,
                    context,
                    logWarnings,
                    ossWorkspace: workspace instanceof OSSWorkspace ? workspace : undefined
                });
            });
        })
    );
}
