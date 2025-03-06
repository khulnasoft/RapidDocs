/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/valid-describe-callback */
/* eslint-disable @typescript-eslint/no-misused-promises */
import path from "path";

import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { loadApis } from "@khulnasoft/project-loader";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { generateAndSnapshotIR, generateAndSnapshotIRFromPath } from "./generateAndSnapshotIR";

const IR_DIR = path.join(__dirname, "irs");

it("audiences", async () => {
    const AUDIENCES_DIR = path.join(__dirname, "fixtures/audiences/rapiddocs");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(AUDIENCES_DIR),
        audiences: { type: "select", audiences: ["external"] },
        workspaceName: "audiences"
    });
});

it("environments no audiences", async () => {
    const AUDIENCES_DIR = path.join(__dirname, "fixtures/audiences/rapiddocs");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(AUDIENCES_DIR),
        audiences: { type: "all" },
        workspaceName: "environmentAudiences"
    });
});

it("environments no audiences on environments but all hack", async () => {
    const AUDIENCES_DIR = path.join(__dirname, "fixtures/audiences/rapiddocs-hack-override-environment-audience");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(AUDIENCES_DIR),
        audiences: { type: "all" },
        workspaceName: "environmentAudiencesAllHack"
    });
});

it("environments no audiences on environments but selected hack", async () => {
    const AUDIENCES_DIR = path.join(__dirname, "fixtures/audiences/rapiddocs-hack-override-environment-audience");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(AUDIENCES_DIR),
        audiences: { type: "select", audiences: ["external"] },
        workspaceName: "environmentAudiencesSelectHack"
    });
});

it.skip("fhir", async () => {
    const FHIR_DIR = path.join(__dirname, "../../../../../../rapiddocs/apis/fhir");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(FHIR_DIR),
        audiences: { type: "all" },
        workspaceName: "fhir"
    });
}, 200_000);

describe("test definitions", async () => {
    const TEST_DEFINITIONS_DIR = path.join(__dirname, "../../../../../../test-definitions");
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
                await generateAndSnapshotIR({
                    absolutePathToIr: AbsoluteFilePath.of(path.join(__dirname, "test-definitions")),
                    workspace,
                    audiences: { type: "all" },
                    workspaceName: workspace.workspaceName ?? ""
                });
            });
        })
    );
});

it("test definitions openapi", async () => {
    const TEST_DEFINITIONS_DIR = path.join(__dirname, "../../../../../../test-definitions-openapi");
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
            await generateAndSnapshotIR({
                absolutePathToIr: AbsoluteFilePath.of(path.join(__dirname, "test-definitions-openapi")),
                workspace,
                audiences:
                    workspace.workspaceName === "audiences"
                        ? { type: "select", audiences: ["public"] }
                        : { type: "all" },
                workspaceName: workspace.workspaceName ?? ""
            });
        })
    );
}, 200_000);

it("generics", async () => {
    const GENERICS_DIR = path.join(__dirname, "fixtures/generics/rapiddocs");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(GENERICS_DIR),
        audiences: { type: "all" },
        workspaceName: "generics"
    });
}, 200_000);

it("availability", async () => {
    const AVAILABILITY_DIR = path.join(__dirname, "fixtures/availability/rapiddocs");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(AVAILABILITY_DIR),
        audiences: { type: "all" },
        workspaceName: "availability"
    });
}, 200_000);

it("docs", async () => {
    const DOCS_DIR = path.join(__dirname, "fixtures/docs/rapiddocs");
    await generateAndSnapshotIRFromPath({
        absolutePathToIr: AbsoluteFilePath.of(IR_DIR),
        absolutePathToWorkspace: AbsoluteFilePath.of(DOCS_DIR),
        audiences: { type: "all" },
        workspaceName: "docs"
    });
}, 200_000);
