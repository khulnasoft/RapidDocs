import chalk from "chalk";

import { loggingExeca } from "@khulnasoft/logging-execa";

import { CliContext } from "./cli-context/CliContext";
import { RAPIDDOCS_CWD_ENV_VAR } from "./cwd";

export async function rerunRapiddocsCliAtVersion({
    version,
    cliContext,
    env
}: {
    version: string;
    cliContext: CliContext;
    env?: Record<string, string>;
}): Promise<void> {
    cliContext.suppressUpgradeMessage();

    const commandLineArgs = [
        "--quiet",
        "--yes",
        `${cliContext.environment.packageName}@${version}`,
        ...process.argv.slice(2)
    ];
    cliContext.logger.debug(
        [
            `Re-running CLI at version ${version}.`,
            `${chalk.dim(`+ npx ${commandLineArgs.map((arg) => `"${arg}"`).join(" ")}`)}`
        ].join("\n")
    );

    const { failed, stdout, stderr } = await loggingExeca(cliContext.logger, "npx", ["--quiet", ...commandLineArgs], {
        stdio: "inherit",
        reject: false,
        env: {
            ...env,
            [RAPIDDOCS_CWD_ENV_VAR]: process.env[RAPIDDOCS_CWD_ENV_VAR] ?? process.cwd()
        }
    });
    if (stdout.includes("code EEXIST") || stderr.includes("code EEXIST")) {
        // try again if there is a npx conflict
        return await rerunRapiddocsCliAtVersion({
            version,
            cliContext
        });
    }

    if (failed) {
        cliContext.failWithoutThrowing();
    }
}
