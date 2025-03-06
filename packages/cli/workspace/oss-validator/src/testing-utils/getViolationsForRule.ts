import stripAnsi from "strip-ansi";

import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { CONSOLE_LOGGER } from "@khulnasoft/logger";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { loadAPIWorkspace } from "@khulnasoft/workspace-loader";

import { Rule } from "../Rule";
import { ValidationViolation } from "../ValidationViolation";
import { runRulesOnOSSWorkspace } from "../validateOSSWorkspace";

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
    const result = await loadAPIWorkspace({
        absolutePathToWorkspace,
        context,
        cliVersion: "0.0.0",
        workspaceName: undefined
    });

    if (!result.didSucceed) {
        throw new Error("API workspace failed to load");
    }

    if (!(result.workspace instanceof OSSWorkspace)) {
        throw new Error("Expected an OSS workspace but got a different type");
    }

    const violations = await runRulesOnOSSWorkspace({
        workspace: result.workspace as OSSWorkspace,
        context,
        rules: [rule]
    });

    return violations.map((violation) => ({
        ...violation,
        message: stripAnsi(violation.message)
    }));
}
