// This test is disabled because it fails due to an issue with fdr-sdk's package structure.
// TODO: Re-enable when fdr-sdk is ESM compatible
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { getViolationsForRule } from "../../../testing-utils/getViolationsForRule";
import { PlaygroundEnvironmentsExistRule } from "../playground-environments-exist";

describe("playground-environments-exist", () => {
    it("no environments in api definition", async () => {
        const violations = await getViolationsForRule({
            rule: PlaygroundEnvironmentsExistRule,
            absolutePathToRapiddocsDirectory: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures"),
                RelativeFilePath.of("no-environments-in-api"),
                RelativeFilePath.of("rapiddocs")
            )
        });

        expect(violations).toMatchSnapshot();
    });

    it("non existent environment specified", async () => {
        const violations = await getViolationsForRule({
            rule: PlaygroundEnvironmentsExistRule,
            absolutePathToRapiddocsDirectory: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures"),
                RelativeFilePath.of("wrong-environments-in-docs"),
                RelativeFilePath.of("rapiddocs")
            )
        });

        expect(violations).toMatchSnapshot();
    });
});
