import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { LazyRapiddocsWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { CONSOLE_LOGGER } from "@khulnasoft/logger";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { ValidationViolation } from "../../ValidationViolation";
import { validateRapiddocsWorkspace } from "../../validateRapiddocsWorkspace";

interface Fixture {
    name: string;
    expectedViolations: ValidationViolation[];
}

const FIXTURES: Fixture[] = [
    {
        name: "simple",
        expectedViolations: []
    }
];

describe("validateRapiddocsWorkspace", () => {
    for (const fixture of FIXTURES) {
        const context = createMockTaskContext();
        // eslint-disable-next-line jest/valid-title
        it(fixture.name, async () => {
            const lazyWorkspace = new LazyRapiddocsWorkspace({
                absoluteFilePath: join(
                    AbsoluteFilePath.of(__dirname),
                    RelativeFilePath.of(`fixtures/${fixture.name}/rapiddocs/api`)
                ),
                generatorsConfiguration: undefined,
                context,
                cliVersion: "0.0.0",
                workspaceName: undefined
            });
            const rapiddocsWorkspace = await lazyWorkspace.toRapiddocsWorkspace({ context });

            const violations = validateRapiddocsWorkspace(rapiddocsWorkspace, CONSOLE_LOGGER);
            expect(violations).toEqual(fixture.expectedViolations);
        });
    }
});
