import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Logger } from "@khulnasoft/logger";
import { DocsWorkspace, RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { DocsConfigFileAstNodeTypes } from "./docsAst/DocsConfigFileAstVisitor";

export interface Rule {
    name: string;
    create: (context: RuleContext) => MaybePromise<RuleVisitor<DocsConfigFileAstNodeTypes>>;
}

export type RuleVisitor<AstNodeTypes> = {
    [K in keyof AstNodeTypes]?: (node: AstNodeTypes[K]) => MaybePromise<RuleViolation[]>;
};

export interface RuleContext {
    workspace: DocsWorkspace;
    rapiddocsWorkspaces: RapiddocsWorkspace[];
    ossWorkspaces: OSSWorkspace[];
    logger: Logger;
}

export interface RuleViolation {
    name?: string;
    severity: "fatal" | "error" | "warning";
    message: string;
    relativeFilepath?: RelativeFilePath;
}

export type MaybePromise<T> = T | Promise<T>;
