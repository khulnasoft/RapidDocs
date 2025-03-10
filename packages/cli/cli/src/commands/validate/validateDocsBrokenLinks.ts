import { filterOssWorkspaces } from "@khulnasoft/docs-resolver";
import { validateDocsWorkspace } from "@khulnasoft/docs-validator";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";
import { logViolations } from "./logViolations";

export async function validateDocsBrokenLinks({
    project,
    cliContext,
    errorOnBrokenLinks
}: {
    project: Project;
    cliContext: CliContext;
    errorOnBrokenLinks: boolean;
}): Promise<void> {
    const docsWorkspace = project.docsWorkspaces;

    if (docsWorkspace == null) {
        cliContext.failAndThrow("No docs workspace found");
        return;
    }

    await cliContext.runTaskForWorkspace(docsWorkspace, async (context) => {
        const startTime = performance.now();
        const rapiddocsWorkspaces = await Promise.all(
            project.apiWorkspaces.map(async (workspace) => {
                return workspace.toRapiddocsWorkspace({ context });
            })
        );
        const ossWorkspaces = await filterOssWorkspaces(project);
        const violations = await validateDocsWorkspace(docsWorkspace, context, rapiddocsWorkspaces, ossWorkspaces, true);

        const elapsedMillis = performance.now() - startTime;
        logViolations({
            violations,
            context,
            logWarnings: true,
            logSummary: true,
            logBreadcrumbs: false,
            elapsedMillis
        });

        if (violations.length > 0 && errorOnBrokenLinks) {
            context.failAndThrow();
        }
    });
}
