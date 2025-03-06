import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { MockServer } from "@khulnasoft/mock";
import { Project } from "@khulnasoft/project-loader";
import { AbstractAPIWorkspace, RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { CliContext } from "../../cli-context/CliContext";
import { API_CLI_OPTION } from "../../constants";
import { validateAPIWorkspaceAndLogIssues } from "../validate/validateAPIWorkspaceAndLogIssues";

export async function mockServer({
    cliContext,
    project,
    port
}: {
    cliContext: CliContext;
    project: Project;
    port: number | undefined;
}): Promise<void> {
    await cliContext.instrumentPostHogEvent({
        orgId: project.config.organization,
        command: "rapiddocs mock"
    });

    if (project.apiWorkspaces.length !== 1 || project.apiWorkspaces[0] == null) {
        return cliContext.failAndThrow(`No API specified. Use the --${API_CLI_OPTION} option.`);
    }

    const workspace: AbstractAPIWorkspace<unknown> = project.apiWorkspaces[0];

    await cliContext.runTaskForWorkspace(workspace, async (context) => {
        const rapiddocsWorkspace: RapiddocsWorkspace = await workspace.toRapiddocsWorkspace({ context });

        await validateAPIWorkspaceAndLogIssues({
            context,
            logWarnings: false,
            workspace: rapiddocsWorkspace
        });

        const ir = generateIntermediateRepresentation({
            workspace: rapiddocsWorkspace,
            audiences: { type: "all" },
            generationLanguage: undefined,
            keywords: undefined,
            smartCasing: false,
            exampleGeneration: { disabled: false },
            readme: undefined,
            version: undefined,
            packageName: undefined,
            context,
            sourceResolver: new SourceResolverImpl(context, rapiddocsWorkspace)
        });

        const mockServer = new MockServer({
            context,
            ir,
            port
        });

        await mockServer.start();
        await mockServer.keepAlive();
    });
}
