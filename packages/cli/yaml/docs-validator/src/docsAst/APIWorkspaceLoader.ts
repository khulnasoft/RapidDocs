import { AbstractAPIWorkspace } from "@khulnasoft/workspace-loader";

export type APIWorkspaceLoader = (id?: string) => AbstractAPIWorkspace<unknown> | undefined;
