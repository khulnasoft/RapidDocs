import { getDirectoryContents, getDirectoryContentsForSnapshot } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";
import { init } from "../init/init";

describe("rapiddocs add", () => {
    it("rapiddocs add <generator>", async () => {
        const pathOfDirectory = await init();

        const add = async (generator: string) => {
            await runRapiddocsCli(["add", generator], {
                cwd: pathOfDirectory
            });
        };

        await add("rapiddocsapi/rapiddocs-java-sdk");
        await add("rapiddocs-postman");

        expect(await getDirectoryContentsForSnapshot(pathOfDirectory)).not.toBeNull();
    }, 60_000);

    it("rapiddocs add <generator> --group sdk", async () => {
        const pathOfDirectory = await init();

        const add = async (generator: string, groupName: string) => {
            await runRapiddocsCli(["add", generator, "--group", groupName], {
                cwd: pathOfDirectory
            });
        };

        await add("rapiddocs-typescript", "typescript");

        expect(await getDirectoryContentsForSnapshot(pathOfDirectory)).toMatchSnapshot();
    }, 60_000);
});
