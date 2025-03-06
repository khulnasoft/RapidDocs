import stripAnsi from "strip-ansi";

import { filterOssWorkspaces } from "@khulnasoft/docs-resolver";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { loadProjectFromDirectory } from "@khulnasoft/project-loader";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { Rule } from "../Rule";
import { ValidationViolation } from "../ValidationViolation";
import { runRulesOnDocsWorkspace } from "../validateDocsWorkspace";

export declare namespace getViolationsForRule {
    export interface Args {
        rule: Rule;
        absolutePathToRapiddocsDirectory: AbsoluteFilePath;
    }
}

export async function getViolationsForRule({
    rule,
    absolutePathToRapiddocsDirectory
}: getViolationsForRule.Args): Promise<ValidationViolation[]> {
    const context = createMockTaskContext();
    const project = await loadProjectFromDirectory({
        absolutePathToRapiddocsDirectory,
        context,
        cliVersion: "0.0.0",
        defaultToAllApiWorkspaces: true,
        commandLineApiWorkspace: undefined,
        cliName: "rapiddocs"
    });

    if (project.docsWorkspaces == null) {
        throw new Error("Expected docs workspace to be present, but found none");
    }

    const rapiddocsWorkspaces = await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            return workspace.toRapiddocsWorkspace(
                { context },
                { enableUniqueErrorsPerEndpoint: true, detectGlobalHeaders: false }
            );
        })
    );

    const violations = await runRulesOnDocsWorkspace({
        workspace: project.docsWorkspaces,
        context,
        rules: [rule],
        rapiddocsWorkspaces,
        ossWorkspaces: await filterOssWorkspaces(project)
    });

    return violations.map((violation) => ({
        ...violation,
        message: stripAnsi(violation.message)
    }));
}
