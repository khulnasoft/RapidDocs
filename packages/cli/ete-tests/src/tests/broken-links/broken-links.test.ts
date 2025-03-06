import stripAnsi from "strip-ansi";

import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";

const fixturesDir = join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("fixtures"));
describe("rapiddocs docs broken-links", () => {
    it("simple broken links", async () => {
        const { stdout } = await runRapiddocsCli(["docs", "broken-links"], {
            cwd: join(fixturesDir, RelativeFilePath.of("simple")),
            reject: false
        });
        expect(
            stripAnsi(stdout)
                // The expected stdout for the "simple" fixture includes
                // an elapsed time that can change on every test run.
                // So, we truncate the last 15 characters to remove the
                // variable part of the output.
                .slice(0, -15)
        ).toMatchSnapshot();
    }, 20_000);
});
