import { findUp } from "find-up";

import {
    AbsoluteFilePath,
    Directory,
    RelativeFilePath,
    doesPathExist,
    getDirectoryContents,
    join
} from "@khulnasoft/fs-utils";

import { Migration } from "../../../types/Migration";
import { getAbsolutePathToDocsYaml } from "./docs-config";
import { migrateDocsAndMultipleAPIs } from "./migrateDocsAndMultipleAPIs";
import { migrateDocsAndSingleAPI } from "./migrateDocsAndSingleAPI";
import { migrateOnlyMultipleAPIs } from "./migrateOnlyMultipleAPIs";
import { migrateOnlySingleAPI } from "./migrateOnlySingleAPI";

export const migration: Migration = {
    name: "flatten-rapiddocs-directory-structure",
    summary: "Flattens your rapiddocs directory structure. If you have one API, you no longer need an API folder.",
    run: async ({ context }) => {
        const absolutePathToRapiddocsDirectory = await getRapiddocsDirectory();
        if (absolutePathToRapiddocsDirectory == null) {
            context.failAndThrow("Rapiddocs directory not found. Failed to run migration");
            return;
        }
        const rapiddocsDirectoryContents = await getDirectoryContents(absolutePathToRapiddocsDirectory);

        const workspaces: Directory[] = [];
        for (const fileOrFolder of rapiddocsDirectoryContents) {
            if (fileOrFolder.type === "directory") {
                workspaces.push(fileOrFolder);
            }
        }

        // Nothing to migrate if no workspaces present
        if (workspaces.length === 0) {
            return;
        }

        // Migrate single workspace
        if (workspaces.length === 1 && workspaces[0] != null) {
            const absolutePathToWorkspace = join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(workspaces[0].name));
            const hasDocs = await doesPathExist(getAbsolutePathToDocsYaml({ absolutePathToWorkspace }));
            if (hasDocs) {
                await migrateDocsAndSingleAPI({ absolutePathToRapiddocsDirectory, absolutePathToWorkspace });
            } else {
                await migrateOnlySingleAPI({ absolutePathToRapiddocsDirectory, absolutePathToWorkspace });
            }
            return;
        }

        // Migrate multiple workspace
        const workspacesContainingDocs = [];
        for (const workspace of workspaces) {
            const absolutePathToDocsYaml = getAbsolutePathToDocsYaml({
                absolutePathToWorkspace: join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(workspace.name))
            });
            if (await doesPathExist(absolutePathToDocsYaml)) {
                workspacesContainingDocs.push(workspace);
            }
        }

        if (workspacesContainingDocs.length === 0 || workspacesContainingDocs[0] == null) {
            await migrateOnlyMultipleAPIs({
                absolutePathToRapiddocsDirectory,
                workspaces: workspaces.map((workspace) => workspace.name)
            });
            return;
        }

        if (workspacesContainingDocs.length > 1) {
            context.failAndThrow(
                "Detected multiple docs websites being published. This is unsupported in the latest upgrade. File an issue (https://github.com/khulnasoft/rapiddocs) if this is important!"
            );
            return;
        }

        await migrateDocsAndMultipleAPIs({
            absolutePathToRapiddocsDirectory,
            workspaces: workspaces.map((workspace) => workspace.name),
            workspaceContainingDocs: workspacesContainingDocs[0].name
        });
    }
};

const RAPIDDOCS_DIRECTORY = "rapiddocs";
async function getRapiddocsDirectory(): Promise<AbsoluteFilePath | undefined> {
    const rapiddocsDirectoryStr = await findUp(RAPIDDOCS_DIRECTORY, { type: "directory" });
    if (rapiddocsDirectoryStr == null) {
        return undefined;
    }
    return AbsoluteFilePath.of(rapiddocsDirectoryStr);
}
