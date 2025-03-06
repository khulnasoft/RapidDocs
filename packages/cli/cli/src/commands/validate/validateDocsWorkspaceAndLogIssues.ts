import { validateDocsWorkspace } from "@khulnasoft/docs-validator";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { TaskContext } from "@khulnasoft/task-context";
import { DocsWorkspace, RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { logViolations } from "./logViolations";

export async function validateDocsWorkspaceWithoutExiting({
    workspace,
    rapiddocsWorkspaces,
    ossWorkspaces,
    context,
    logWarnings,
    errorOnBrokenLinks,
    logSummary = true,
    excludeRules
}: {
    workspace: DocsWorkspace;
    rapiddocsWorkspaces: RapiddocsWorkspace[];
    ossWorkspaces: OSSWorkspace[];
    context: TaskContext;
    logWarnings: boolean;
    errorOnBrokenLinks?: boolean;
    logSummary?: boolean;
    excludeRules?: string[];
}): Promise<{ hasErrors: boolean }> {
    const startTime = performance.now();
    const violations = await validateDocsWorkspace(
        workspace,
        context,
        rapiddocsWorkspaces,
        ossWorkspaces,
        false,
        excludeRules
    );
    const elapsedMillis = performance.now() - startTime;
    let { hasErrors } = logViolations({
        violations,
        context,
        logWarnings,
        logSummary,
        logBreadcrumbs: false,
        elapsedMillis
    });

    if (errorOnBrokenLinks) {
        hasErrors = hasErrors || violations.some((violation) => violation.name === "valid-markdown-links");
    }

    return { hasErrors };
}

export async function validateDocsWorkspaceAndLogIssues({
    workspace,
    rapiddocsWorkspaces,
    ossWorkspaces,
    context,
    logWarnings,
    errorOnBrokenLinks,
    excludeRules
}: {
    workspace: DocsWorkspace;
    rapiddocsWorkspaces: RapiddocsWorkspace[];
    ossWorkspaces: OSSWorkspace[];
    context: TaskContext;
    logWarnings: boolean;
    errorOnBrokenLinks?: boolean;
    excludeRules?: string[];
}): Promise<void> {
    const { hasErrors } = await validateDocsWorkspaceWithoutExiting({
        workspace,
        context,
        logWarnings,
        rapiddocsWorkspaces,
        ossWorkspaces,
        errorOnBrokenLinks,
        excludeRules
    });

    if (hasErrors) {
        context.failAndThrow();
    }
}
