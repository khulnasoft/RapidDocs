import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { createMigrationTester } from "../../../__test__/utils/createMigrationTester";
import { V43_TO_V42_MIGRATION } from "../migrateFromV43ToV42";

const runMigration = createMigrationTester(V43_TO_V42_MIGRATION);

describe("migrateFromV43ToV42", () => {
    it("snapshot", async () => {
        const pathToFixture = join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("./fixtures/simple"));
        const migrated = await runMigration({
            pathToFixture
        });
        expect(await migrated.jsonify()).toMatchSnapshot();
    });
});
