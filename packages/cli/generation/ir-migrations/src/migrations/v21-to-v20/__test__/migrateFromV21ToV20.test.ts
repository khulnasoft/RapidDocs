import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { createLogger } from "@khulnasoft/logger";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { createMigrationTester } from "../../../__test__/utils/createMigrationTester";
import { V21_TO_V20_MIGRATION } from "../migrateFromV21ToV20";

const runMigration = createMigrationTester(V21_TO_V20_MIGRATION);

describe("migrateFromV21ToV20", () => {
    it("throws when endpoint has file downloading", async () => {
        let output = "";
        const context = createMockTaskContext({
            logger: createLogger((_logLevel, ...logs) => {
                output += logs.join(" ");
            })
        });
        await expect(
            runMigration({
                pathToFixture: join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("./fixtures/text-streaming")),
                context: {
                    taskContext: context
                }
            })
        ).rejects.toBeTruthy();
        expect(output).toContain("does not support streaming text responses");
    });
});
