import validatePackageName from "validate-npm-package-name";

import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { validateRapiddocsWorkspace } from "@khulnasoft/rapiddocs-definition-validator";
import { validateGeneratorsWorkspace } from "@khulnasoft/generators-validator";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { validateOSSWorkspace } from "@khulnasoft/oss-validator";
import { TaskContext } from "@khulnasoft/task-context";

import { logViolations } from "./logViolations";

export async function validateAPIWorkspaceWithoutExiting({
    workspace,
    context,
    logWarnings,
    logSummary = true,
    ossWorkspace
}: {
    workspace: RapiddocsWorkspace;
    context: TaskContext;
    logWarnings: boolean;
    logSummary?: boolean;
    ossWorkspace?: OSSWorkspace;
}): Promise<{ hasErrors: boolean }> {
    const startTime = performance.now();
    const apiViolations = validateRapiddocsWorkspace(workspace, context.logger);
    const generatorViolations = await validateGeneratorsWorkspace(workspace, context.logger);
    const violations = [...apiViolations, ...generatorViolations];
    if (ossWorkspace) {
        violations.concat(await validateOSSWorkspace(ossWorkspace, context));
    }
    const elapsedMillis = performance.now() - startTime;
    const { hasErrors } = logViolations({
        violations,
        context,
        logWarnings,
        logSummary,
        elapsedMillis
    });

    return { hasErrors };
}

export async function validateAPIWorkspaceAndLogIssues({
    workspace,
    context,
    logWarnings,
    ossWorkspace
}: {
    workspace: RapiddocsWorkspace;
    context: TaskContext;
    logWarnings: boolean;
    ossWorkspace?: OSSWorkspace;
}): Promise<void> {
    if (!validatePackageName(workspace.definition.rootApiFile.contents.name).validForNewPackages) {
        context.failAndThrow("API name is not valid.");
    }

    const { hasErrors } = await validateAPIWorkspaceWithoutExiting({
        workspace,
        context,
        logWarnings,
        ossWorkspace
    });

    if (hasErrors) {
        context.failAndThrow();
    }
}
