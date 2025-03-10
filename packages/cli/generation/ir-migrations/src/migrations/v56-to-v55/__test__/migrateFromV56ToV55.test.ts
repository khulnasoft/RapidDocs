import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { createMigrationTester } from "../../../__test__/utils/createMigrationTester";
import { V56_TO_V55_MIGRATION } from "../migrateFromV56ToV55";

const runMigration = createMigrationTester(V56_TO_V55_MIGRATION);

describe("migrateFromV56ToV55", () => {
    it("pagination", async () => {
        const pathToFixture = join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("./fixtures/pagination"));
        const migrated = await runMigration({
            pathToFixture
        });
        expect(await migrated.jsonify()).toMatchSnapshot();
    });
});
