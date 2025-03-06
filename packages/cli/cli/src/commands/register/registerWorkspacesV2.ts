import chalk from "chalk";

import { RapiddocsToken } from "@khulnasoft/auth";
import { Project } from "@khulnasoft/project-loader";
import { registerApi } from "@khulnasoft/register";

import { CliContext } from "../../cli-context/CliContext";

export async function registerWorkspacesV2({
    project,
    cliContext,
    token
}: {
    project: Project;
    cliContext: CliContext;
    token: RapiddocsToken;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                await registerApi({
                    organization: project.config.organization,
                    workspace: await workspace.toRapiddocsWorkspace({ context }),
                    context,
                    token,
                    audiences: { type: "all" },
                    snippetsConfig: {
                        typescriptSdk: undefined,
                        pythonSdk: undefined,
                        javaSdk: undefined,
                        rubySdk: undefined,
                        goSdk: undefined,
                        csharpSdk: undefined
                    }
                });
                context.logger.info(chalk.green("Registered API"));
            });
        })
    );
}
