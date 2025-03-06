import { AbstractAPIWorkspace } from "@khulnasoft/api-workspace-commons";
import { docsYml } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";

export type Workspace = DocsWorkspace | AbstractAPIWorkspace<unknown>;

export interface DocsWorkspace {
    type: "docs";
    workspaceName: string | undefined;
    absoluteFilePath: AbsoluteFilePath; // path to the rapiddocs folder (dirname(absoluteFilepathToDocsConfig))
    absoluteFilepathToDocsConfig: AbsoluteFilePath;
    config: docsYml.RawSchemas.DocsConfiguration;
}
