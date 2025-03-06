import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { DefinitionFileSchema, PackageMarkerFileSchema, RootApiFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { Logger } from "@khulnasoft/logger";

import { DefinitionFileAstNodeTypes, PackageMarkerAstNodeTypes, RootApiFileAstNodeTypes } from "./ast";

export interface Rule {
    name: string;
    DISABLE_RULE?: boolean;
    create: (context: RuleContext) => RuleVisitors;
}

export interface RuleContext {
    workspace: RapiddocsWorkspace;
    logger: Logger;
}

export interface RuleVisitors {
    rootApiFile?: RuleVisitor<RootApiFileAstNodeTypes, RootApiFileSchema>;
    definitionFile?: RuleVisitor<DefinitionFileAstNodeTypes, DefinitionFileSchema>;
    packageMarker?: RuleVisitor<PackageMarkerAstNodeTypes, PackageMarkerFileSchema>;
}

export type RuleVisitor<AstNodeTypes, FileSchema> = {
    [K in keyof AstNodeTypes]?: (node: AstNodeTypes[K], args: RuleRunnerArgs<FileSchema>) => RuleViolation[];
};

export interface RuleRunnerArgs<FileSchema> {
    relativeFilepath: RelativeFilePath;
    contents: FileSchema;
}

export interface RuleViolation {
    severity: "fatal" | "error" | "warning";
    message: string;
}
