import { formatWorkspace } from "@khulnasoft/rapiddocs-definition-formatter";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Project } from "@khulnasoft/project-loader";

import { CliContext } from "../../cli-context/CliContext";

export async function formatWorkspaces({
    project,
    cliContext,
    shouldFix
}: {
    project: Project;
    cliContext: CliContext;
    shouldFix: boolean;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            if (workspace instanceof OSSWorkspace) {
                return;
            }
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                await formatWorkspace({
                    workspace: await workspace.toRapiddocsWorkspace({ context }),
                    context,
                    shouldFix
                });
            });
        })
    );
}
