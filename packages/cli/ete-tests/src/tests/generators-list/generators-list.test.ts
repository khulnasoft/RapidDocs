import { runRapiddocsCli } from "../../utils/runRapiddocsCli";
import { init } from "../init/init";

// Ensure that the generators list command works and the format doesn't change, since rapiddocs-bot consumes this
describe("rapiddocs generator list", () => {
    it("rapiddocs generator list", async () => {
        const pathOfDirectory = await init();

        const out = await runRapiddocsCli(["generator", "list"], {
            cwd: pathOfDirectory
        });

        expect(out.stdout).toMatchSnapshot();
    }, 60_000);

    it("rapiddocs generator list with exclude", async () => {
        const pathOfDirectory = await init();

        const out = await runRapiddocsCli(["generator", "list", "--exclude-mode", "local-file-system"], {
            cwd: pathOfDirectory
        });

        expect(out.stdout).toMatchSnapshot();
    }, 60_000);

    it("rapiddocs generator list with include", async () => {
        const pathOfDirectory = await init();

        const out = await runRapiddocsCli(["generator", "list", "--include-mode", "local-file-system"], {
            cwd: pathOfDirectory
        });

        expect(out.stdout).toMatchSnapshot();
    }, 60_000);
});
