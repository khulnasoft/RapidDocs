import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { createLogger } from "@khulnasoft/logger";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { createMigrationTester } from "../../../__test__/utils/createMigrationTester";
import { V19_TO_V18_MIGRATION } from "../migrateFromV19ToV18";

const runMigration = createMigrationTester(V19_TO_V18_MIGRATION);

describe("migrateFromV19ToV18", () => {
    it("throws when example is a date", async () => {
        let output = "";
        const context = createMockTaskContext({
            logger: createLogger((_logLevel, ...logs) => {
                output += logs.join(" ");
            })
        });
        await expect(
            runMigration({
                pathToFixture: join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("./fixtures/date-example")),
                context: {
                    taskContext: context
                }
            })
        ).rejects.toBeTruthy();
        expect(output).toContain("does not support examples for dates");
    });
});
