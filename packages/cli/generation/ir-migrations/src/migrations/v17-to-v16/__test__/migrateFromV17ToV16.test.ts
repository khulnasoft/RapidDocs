import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { createLogger } from "@khulnasoft/logger";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { createMigrationTester } from "../../../__test__/utils/createMigrationTester";
import { V17_TO_V16_MIGRATION } from "../migrateFromV17ToV16";

const runMigration = createMigrationTester(V17_TO_V16_MIGRATION);

describe("migrateFromV17ToV16", () => {
    it("throws when union extensions are used", async () => {
        let output = "";
        const context = createMockTaskContext({
            logger: createLogger((_logLevel, ...logs) => {
                output += logs.join(" ");
            })
        });
        await expect(
            runMigration({
                pathToFixture: join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("./fixtures/simple")),
                context: {
                    taskContext: context
                }
            })
        ).rejects.toBeTruthy();
        expect(output).toContain("does not support union types with extensions.");
    });
});
