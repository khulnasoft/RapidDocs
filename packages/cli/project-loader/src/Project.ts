import { AbstractAPIWorkspace } from "@khulnasoft/api-workspace-commons";
import { rapiddocsConfigJson } from "@khulnasoft/configuration-loader";
import { DocsWorkspace } from "@khulnasoft/workspace-loader";

export interface Project {
    config: rapiddocsConfigJson.ProjectConfig;
    apiWorkspaces: AbstractAPIWorkspace<unknown>[];
    docsWorkspaces: DocsWorkspace | undefined;
    loadAPIWorkspace: (name: string | undefined) => AbstractAPIWorkspace<unknown> | undefined;
}
