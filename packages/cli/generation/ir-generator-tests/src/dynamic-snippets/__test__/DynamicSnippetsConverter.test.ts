import path from "path";

import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { loadApis } from "@khulnasoft/project-loader";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { generateAndSnapshotDynamicIR } from "./generateAndSnapshotDynamicIR";

// eslint-disable-next-line @typescript-eslint/no-misused-promises
describe("test definitions", async () => {
    const TEST_DEFINITIONS_DIR = path.join(__dirname, "../../../../../../../test-definitions");
    const apiWorkspaces = await loadApis({
        rapiddocsDirectory: join(AbsoluteFilePath.of(TEST_DEFINITIONS_DIR), RelativeFilePath.of("rapiddocs")),
        context: createMockTaskContext(),
        cliVersion: "0.0.0",
        cliName: "rapiddocs",
        commandLineApiWorkspace: undefined,
        defaultToAllApiWorkspaces: true
    });

    await Promise.all(
        apiWorkspaces.map(async (workspace) => {
            it(`${workspace.workspaceName}`, async () => {
                await generateAndSnapshotDynamicIR({
                    absolutePathToIr: AbsoluteFilePath.of(path.join(__dirname, "test-definitions")),
                    workspace,
                    audiences: { type: "all" },
                    workspaceName: workspace.workspaceName ?? ""
                });
            });
        })
    );
});
