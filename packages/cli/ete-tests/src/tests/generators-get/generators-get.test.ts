import { readFile } from "fs/promises";
import tmp from "tmp-promise";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";
import { init } from "../init/init";

// Ensure that the generators list command works and the format doesn't change, since rapiddocs-bot consumes this
describe("rapiddocs generator get", () => {
    it("rapiddocs generator get --version", async () => {
        const pathOfDirectory = await init();

        const out = await runRapiddocsCli(
            ["generator", "get", "--generator", "rapiddocsapi/rapiddocs-typescript-node-sdk", "--group", "local", "--version"],
            {
                cwd: pathOfDirectory
            }
        );

        expect(out.stdout).toMatchSnapshot();
    }, 60_000);

    it("rapiddocs generator get --language", async () => {
        const pathOfDirectory = await init();

        const out = await runRapiddocsCli(
            ["generator", "get", "--generator", "rapiddocsapi/rapiddocs-typescript-node-sdk", "--group", "local", "--language"],
            {
                cwd: pathOfDirectory
            }
        );

        expect(out.stdout).toMatchSnapshot();
    }, 60_000);

    it("rapiddocs generator get to file", async () => {
        const pathOfDirectory = await init();
        const tmpFile = await tmp.file();
        await runRapiddocsCli(
            [
                "generator",
                "get",
                "--generator",
                "rapiddocsapi/rapiddocs-typescript-node-sdk",
                "--group",
                "local",
                "--language",
                "--version",
                "--repository",
                "-o",
                tmpFile.path
            ],
            {
                cwd: pathOfDirectory
            }
        );

        const out = await readFile(tmpFile.path, "utf-8");
        expect(out).toMatchSnapshot();
    }, 60_000);
});
