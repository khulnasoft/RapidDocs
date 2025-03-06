import { readFile } from "fs/promises";
import tmp from "tmp-promise";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";
import { init } from "../init/init";

// Pretty trivial command, but adding tests in case this breaks down the line
describe("rapiddocs organization", () => {
    it("rapiddocs organization", async () => {
        const pathOfDirectory = await init();

        const out = await runRapiddocsCli(["organization"], {
            cwd: pathOfDirectory
        });

        expect(out.stdout).toEqual("rapiddocs");
    }, 60_000);

    it("rapiddocs organization -o <output_file>", async () => {
        const pathOfDirectory = await init();

        const tmpFile = await tmp.file();
        await runRapiddocsCli(["organization", "-o", tmpFile.path], {
            cwd: pathOfDirectory
        });

        const out = await readFile(tmpFile.path, "utf-8");
        expect(out).toEqual("rapiddocs");
    }, 60_000);
});
