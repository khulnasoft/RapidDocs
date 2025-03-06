import stripAnsi from "strip-ansi";

import { loadGeneratorsConfiguration } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { LazyRapiddocsWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { CONSOLE_LOGGER } from "@khulnasoft/logger";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { Rule } from "../Rule";
import { ValidationViolation } from "../ValidationViolation";
import { runRulesOnWorkspace } from "../validateGeneratorsWorkspace";

export declare namespace getViolationsForRule {
    export interface Args {
        rule: Rule;
        absolutePathToWorkspace: AbsoluteFilePath;
        cliVersion?: string;
    }
}

export async function getViolationsForRule({
    rule,
    absolutePathToWorkspace,
    cliVersion
}: getViolationsForRule.Args): Promise<ValidationViolation[]> {
    const context = createMockTaskContext();

    const lazyWorkspace = new LazyRapiddocsWorkspace({
        absoluteFilePath: absolutePathToWorkspace,
        generatorsConfiguration: await loadGeneratorsConfiguration({
            absolutePathToWorkspace,
            context
        }),
        context,
        cliVersion: cliVersion ?? "0.0.0",
        workspaceName: undefined
    });
    const rapiddocsWorkspace = await lazyWorkspace.toRapiddocsWorkspace({ context });

    const violations = await runRulesOnWorkspace({
        workspace: rapiddocsWorkspace,
        logger: CONSOLE_LOGGER,
        rules: [rule]
    });

    return violations.map((violation) => ({
        ...violation,
        message: stripAnsi(violation.message)
    }));
}
