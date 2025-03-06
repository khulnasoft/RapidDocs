import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { generatorsYml } from "@khulnasoft/configuration-loader";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { loggingExeca } from "@khulnasoft/logging-execa";
import { MockServer } from "@khulnasoft/mock";
import { Project } from "@khulnasoft/project-loader";
import { AbstractAPIWorkspace, RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { CliContext } from "../../cli-context/CliContext";
import { API_CLI_OPTION } from "../../constants";
import { validateAPIWorkspaceAndLogIssues } from "../validate/validateAPIWorkspaceAndLogIssues";

export async function testOutput({
    cliContext,
    project,
    testCommand,
    generationLanguage
}: {
    cliContext: CliContext;
    project: Project;
    testCommand: string | undefined;
    generationLanguage: generatorsYml.GenerationLanguage | undefined;
}): Promise<void> {
    await cliContext.instrumentPostHogEvent({
        orgId: project.config.organization,
        command: "rapiddocs test"
    });

    if (testCommand == null) {
        return cliContext.failAndThrow("No test command specified. Use the --command option.");
    }

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
            port: undefined
        });

        const port = await mockServer.start();
        const testsUrl = `http://localhost:${port}`;
        // run tests
        context.logger.info("Running tests...");
        context.logger.info(`>> ${testCommand}`);
        // set a few default envvars for convenience
        context.logger.debug(`envvar set: TESTS_BASE_URL=${testsUrl}`);

        // There's probably a more human way to do this...
        const commands = testCommand.split(" && ").map((command) => command.split(" "));
        for (const command of commands) {
            const { failed } = await loggingExeca(cliContext.logger, command[0] ?? "", command.slice(1), {
                reject: false,
                env: {
                    ["TESTS_BASE_URL"]: testsUrl
                }
            });

            if (failed) {
                mockServer.stop();
                context.logger.error("Tests failed, Rapiddocs mock server stopping.");
                context.logger.error("View test output above.");

                cliContext.failAndThrow();
            }
        }

        mockServer.stop();
        context.logger.info("Rapiddocs mock server stopped.");
    });
}
