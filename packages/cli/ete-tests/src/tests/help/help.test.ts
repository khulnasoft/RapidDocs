import tmp from "tmp-promise";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";

describe("help", () => {
    it("no arguments", async () => {
        const { stderr, failed } = await runRapiddocsCli([], {
            cwd: (await tmp.dir()).path,
            reject: false
        });
        expect(stderr).toMatchSnapshot();
        expect(failed).toBe(true);
    }, 60_000);
});
