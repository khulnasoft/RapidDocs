import tmp from "tmp-promise";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";

const DEFAULT_VERSION = "0.0.0";

describe("version", () => {
    it("--version", async () => {
        const { stdout } = await runRapiddocsCli(["--version"], {
            cwd: (await tmp.dir()).path
        });
        expect(stdout).toEqual(DEFAULT_VERSION);
    }, 60_000);

    it("-v", async () => {
        const { stdout } = await runRapiddocsCli(["-v"], {
            cwd: (await tmp.dir()).path
        });
        expect(stdout).toEqual(DEFAULT_VERSION);
    }, 60_000);
});
