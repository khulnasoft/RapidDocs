import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { generatorsYml } from "@khulnasoft/configuration-loader";
import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { Logger } from "@khulnasoft/logger";

import { GeneratorsYmlFileAstNodeTypes } from "./ast/GeneratorsYmlAstVisitor";

export interface Rule {
    name: string;
    DISABLE_RULE?: boolean;
    create: (context: RuleContext) => Promise<RuleVisitors>;
}

export interface RuleContext {
    workspace: RapiddocsWorkspace;
    logger: Logger;
}

export interface RuleVisitors {
    generatorsYml?: RuleVisitor<GeneratorsYmlFileAstNodeTypes, generatorsYml.GeneratorsConfigurationSchema>;
}

export type RuleVisitor<AstNodeTypes, FileSchema> = {
    [K in keyof AstNodeTypes]?: (node: AstNodeTypes[K], args: RuleRunnerArgs<FileSchema>) => Promise<RuleViolation[]>;
};

export interface RuleRunnerArgs<FileSchema> {
    relativeFilepath: RelativeFilePath;
    contents: FileSchema;
}

export interface RuleViolation {
    severity: "fatal" | "error" | "warning";
    message: string;
}
