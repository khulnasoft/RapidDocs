import { DOCS_CONFIGURATION_FILENAME } from "@khulnasoft/configuration-loader";
import { RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { TaskContext } from "@khulnasoft/task-context";
import { DocsWorkspace, RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { Rule } from "./Rule";
import { ValidationViolation } from "./ValidationViolation";
import { createDocsConfigFileAstVisitorForRules } from "./createDocsConfigFileAstVisitorForRules";
import { visitDocsConfigFileYamlAst } from "./docsAst/visitDocsConfigFileYamlAst";
import { getAllRules } from "./getAllRules";
import { ValidMarkdownLinks } from "./rules/valid-markdown-link";

export async function validateDocsWorkspace(
    workspace: DocsWorkspace,
    context: TaskContext,
    rapiddocsWorkspaces: RapiddocsWorkspace[],
    ossWorkspaces: OSSWorkspace[],
    onlyCheckBrokenLinks?: boolean,
    excludeRules?: string[]
): Promise<ValidationViolation[]> {
    // In the future we'll do something more sophisticated that lets you pick and choose which rules to run.
    // For right now, the only use case is to check for broken links, so only expose a choice to run that rule.
    const rules = onlyCheckBrokenLinks ? [ValidMarkdownLinks] : getAllRules(excludeRules);
    return runRulesOnDocsWorkspace({ workspace, rules, context, rapiddocsWorkspaces, ossWorkspaces });
}

// exported for testing
export async function runRulesOnDocsWorkspace({
    workspace,
    rules,
    context,
    rapiddocsWorkspaces,
    ossWorkspaces
}: {
    workspace: DocsWorkspace;
    rules: Rule[];
    context: TaskContext;
    rapiddocsWorkspaces: RapiddocsWorkspace[];
    ossWorkspaces: OSSWorkspace[];
}): Promise<ValidationViolation[]> {
    const violations: ValidationViolation[] = [];

    const allRuleVisitors = await Promise.all(
        rules.map((rule) => rule.create({ workspace, rapiddocsWorkspaces, ossWorkspaces, logger: context.logger }))
    );

    const astVisitor = createDocsConfigFileAstVisitorForRules({
        relativeFilepath: RelativeFilePath.of(DOCS_CONFIGURATION_FILENAME),
        allRuleVisitors,
        addViolations: (newViolations: ValidationViolation[]) => {
            violations.push(...newViolations);
        }
    });

    await visitDocsConfigFileYamlAst({
        contents: workspace.config,
        visitor: astVisitor,
        absoluteFilepathToConfiguration: join(
            workspace.absoluteFilePath,
            RelativeFilePath.of(DOCS_CONFIGURATION_FILENAME)
        ),
        absolutePathToRapiddocsFolder: workspace.absoluteFilePath,
        context,
        rapiddocsWorkspaces
    });

    return violations;
}
