import chalk from "chalk";
import { writeFile } from "fs/promises";
import { produce } from "immer";

import { runMigrations } from "@khulnasoft/cli-migrations";
import { RAPIDDOCS_DIRECTORY, rapiddocsConfigJson, getRapiddocsDirectory, loadProjectConfig } from "@khulnasoft/configuration-loader";
import { loggingExeca } from "@khulnasoft/logging-execa";
import { isVersionAhead } from "@khulnasoft/semver-utils";

import { CliContext } from "../../cli-context/CliContext";
import { doesVersionOfCliExist } from "../../cli-context/upgrade-utils/doesVersionOfCliExist";
import { rerunRapiddocsCliAtVersion } from "../../rerunRapiddocsCliAtVersion";

export const PREVIOUS_VERSION_ENV_VAR = "RAPIDDOCS_PRE_UPGRADE_VERSION";

/**
 * there are 3 relevant versions:
 *   1. the version of the CLI specified in rapiddocs.config.json
 *   2. the version of the CLI being run right now.
 *   3. the version of the CLI we're upgrading to (can be passed in, but default
 *      to the latest published version)
 *
 * When the CLI is first invoked, if the version of the CLI is not equal to
 * the version in rapiddocs.config.json, we immediately re-run the CLI at the
 * version specified in rapiddocs.config.json. So by the time we're here, we can
 * assume that version #1 == version #2.
 *
 * if #3 is the same version as #1 and #2 (i.e. we're already at the target version),
 * then this function simply prints "No upgrade available." and returns.
 *
 * otherwise, if an upgrade is available, this function:
 *   1. upgrades the globally-installed version of the CLI to the target version
 *   2. change the version in rapiddocs.config.json to the target version
 *   3. re-runs `rapiddocs upgrade` using the latest version the CLI
 *        implementation detail: when doing so, we set the PREVIOUS_VERSION_ENV_VAR
 *        so we know what version we just upgraded from
 *   4. During this re-run, this function is invoked again. During this re-run,
 *      we run any migrations between PREVIOUS_VERSION_ENV_VAR and the target
 *      version of the CLI.
 */
export async function upgrade({
    cliContext,
    includePreReleases,
    targetVersion
}: {
    cliContext: CliContext;
    includePreReleases: boolean;
    targetVersion: string | undefined;
}): Promise<void> {
    if (targetVersion != null) {
        const versionExists = await doesVersionOfCliExist({
            cliEnvironment: cliContext.environment,
            version: targetVersion
        });
        if (!versionExists) {
            cliContext.failAndThrow(
                `Failed to upgrade to ${targetVersion} because it does not exist. See https://www.npmjs.com/package/${cliContext.environment.packageName}?activeTab=versions.`
            );
        }

        const versionAhead = isVersionAhead(targetVersion, cliContext.environment.packageVersion);
        if (!versionAhead) {
            cliContext.failAndThrow(
                `Cannot upgrade because target version (${targetVersion}) is not ahead of existing version ${cliContext.environment.packageVersion}`
            );
        }
    }

    let rapiddocsCliUpgradeInfo = targetVersion != null ? { targetVersion, isUpgradeAvailable: true } : undefined;
    if (rapiddocsCliUpgradeInfo == null) {
        const rapiddocsUpgradeInfo = await cliContext.isUpgradeAvailable({
            includePreReleases
        });
        if (rapiddocsUpgradeInfo.cliUpgradeInfo != null) {
            rapiddocsCliUpgradeInfo = {
                targetVersion: rapiddocsUpgradeInfo.cliUpgradeInfo.latestVersion,
                isUpgradeAvailable: rapiddocsUpgradeInfo.cliUpgradeInfo.isUpgradeAvailable
            };
        }
    }

    if (rapiddocsCliUpgradeInfo && !rapiddocsCliUpgradeInfo.isUpgradeAvailable) {
        const previousVersion = process.env[PREVIOUS_VERSION_ENV_VAR];
        if (previousVersion == null) {
            cliContext.logger.info("No upgrade available.");
            return;
        }
        await runPostUpgradeSteps({ cliContext, previousVersion, newVersion: rapiddocsCliUpgradeInfo.targetVersion });
    } else if (rapiddocsCliUpgradeInfo != null) {
        const rapiddocsDirectory = await getRapiddocsDirectory();
        if (rapiddocsDirectory == null) {
            return cliContext.failAndThrow(`Directory "${RAPIDDOCS_DIRECTORY}" not found.`);
        }
        const projectConfig = await cliContext.runTask((context) =>
            loadProjectConfig({ directory: rapiddocsDirectory, context })
        );

        const newProjectConfig = produce(projectConfig.rawConfig, (draft) => {
            draft.version = rapiddocsCliUpgradeInfo.targetVersion;
        });
        await writeFile(projectConfig._absolutePath, JSON.stringify(newProjectConfig, undefined, 2));

        cliContext.logger.info(
            `Upgrading from ${chalk.dim(cliContext.environment.packageVersion)} → ${chalk.green(
                rapiddocsCliUpgradeInfo.targetVersion
            )}`
        );

        // special case: if we're running the local-dev version of the CLI, simulate a re-run
        if (cliContext.environment.packageVersion === "0.0.0") {
            await runPostUpgradeSteps({
                cliContext,
                previousVersion: projectConfig.version,
                newVersion: rapiddocsCliUpgradeInfo.targetVersion
            });
        } else {
            await loggingExeca(cliContext.logger, "npm", [
                "install",
                "-g",
                `${cliContext.environment.packageName}@${rapiddocsCliUpgradeInfo.targetVersion}`
            ]);

            await rerunRapiddocsCliAtVersion({
                version: rapiddocsCliUpgradeInfo.targetVersion,
                cliContext,
                env: {
                    [PREVIOUS_VERSION_ENV_VAR]: cliContext.environment.packageVersion
                }
            });
        }
    }
}

async function runPostUpgradeSteps({
    cliContext,
    previousVersion,
    newVersion
}: {
    cliContext: CliContext;
    previousVersion: string;
    newVersion: string;
}) {
    await cliContext.runTask(async (context) => {
        await runMigrations({
            fromVersion: previousVersion,
            toVersion: newVersion,
            context
        });
    });
    await cliContext.exitIfFailed();
}
