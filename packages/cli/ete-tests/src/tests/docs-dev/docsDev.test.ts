import fetch from "node-fetch";

import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { RapiddocsRegistry as FdrCjsSdk } from "@rapiddocs-rapiddocs/fdr-cjs-sdk";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";

const fixturesDir = join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("fixtures"));

describe("rapiddocs docs dev", () => {
    it("dev basic docs", async () => {
        const check = await runRapiddocsCli(["check"], {
            cwd: join(fixturesDir, RelativeFilePath.of("simple"))
        });

        expect(check.exitCode).toBe(0);

        void runRapiddocsCli(["docs", "dev"], {
            cwd: join(fixturesDir, RelativeFilePath.of("simple"))
        });

        await sleep(20_000);

        const response = await fetch("http://localhost:3000/v2/registry/docs/load-with-url", {
            method: "POST"
        });

        expect(response.body != null).toEqual(true);
        const responseText = await response.text();
        expect(responseText.includes("[object Promise]")).toBeFalsy();

        const responseBody = JSON.parse(responseText) as FdrCjsSdk.docs.v2.read.LoadDocsForUrlResponse;
        expect(typeof responseBody === "object").toEqual(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(Object.keys(responseBody as any)).toEqual(["baseUrl", "definition", "lightModeEnabled", "orgId"]);

        // const root = RapiddocsNavigation.utils.convertLoadDocsForUrlResponse(responseBody);
        // const pageIds = new Set(Object.keys(responseBody.definition.pages));
        // const pageIdsVisited = new Set<string>();

        // RapiddocsNavigation.utils.traverseNavigation(root, (node) => {
        //     if (RapiddocsNavigation.hasMarkdown(node)) {
        //         const pageId = RapiddocsNavigation.utils.getPageId(node);
        //         if (pageId != null) {
        //             pageIdsVisited.add(pageId);
        //         }
        //     }
        // });
        // expect(pageIdsVisited.size).toBeGreaterThan(0);

        // const overlap = new Set([...pageIds].filter((x) => pageIdsVisited.has(x)));
        // expect(overlap.size).toEqual(pageIdsVisited.size);
    }, 30_000);
});

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
