import { docsYml } from "@khulnasoft/configuration-loader";
import { NodePath } from "@khulnasoft/rapiddocs-definition-schema";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";
import { AbstractAPIWorkspace } from "@khulnasoft/workspace-loader";

export type DocsConfigFileAstVisitor<R = void | Promise<void>> = {
    [K in keyof DocsConfigFileAstNodeTypes]: DocsConfigFileAstNodeVisitor<K, R>;
};

export interface DocsConfigFileAstNodeTypes {
    file: { config: docsYml.RawSchemas.DocsConfiguration };
    filepath: {
        absoluteFilepath: AbsoluteFilePath;
        value: string /* User defined value for filepath */;
        willBeUploaded?: boolean;
    };
    markdownPage: { title: string; content: string; absoluteFilepath: AbsoluteFilePath };
    versionFile: { path: string; content: unknown };
    apiSection: {
        config: docsYml.RawSchemas.ApiReferenceConfiguration;
        workspace: AbstractAPIWorkspace<unknown>;
        context: TaskContext;
    };
    permissions: docsYml.RawSchemas.WithPermissions;
}

export type DocsConfigFileAstNodeVisitor<K extends keyof DocsConfigFileAstNodeTypes, R = void | Promise<void>> = (
    node: DocsConfigFileAstNodeTypes[K],
    nodePath: NodePath
) => R;
