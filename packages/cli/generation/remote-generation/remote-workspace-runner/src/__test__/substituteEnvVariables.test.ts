import { replaceEnvVariables } from "@khulnasoft/core-utils";
import { NOOP_LOGGER } from "@khulnasoft/logger";
import { RapiddocsCliError, createMockTaskContext } from "@khulnasoft/task-context";

describe("substituteEnvVariables", () => {
    it("basic", () => {
        process.env.FOO_VAR = "foo";
        process.env.BAR_VAR = "bar";
        const content = {
            foo: "bar",
            baz: {
                qux: {
                    thud: "${FOO_VAR}"
                }
            },
            plugh: "${FOO_VAR}-${BAR_VAR}"
        };

        const context = createMockTaskContext();
        const substituted = replaceEnvVariables(content, { onError: (e) => context.failAndThrow(e) });

        expect(substituted).toEqual({ foo: "bar", baz: { qux: { thud: "foo" } }, plugh: "foo-bar" });
    });

    it("fails with undefined env var", () => {
        process.env.FOO_VAR = "foo";
        const content = {
            foo: "bar",
            baz: {
                qux: {
                    thud: "${UNDEFINED_ENV_VAR}"
                }
            },
            plugh: "${FOO_VAR}"
        };
        const context = createMockTaskContext({ logger: NOOP_LOGGER });
        expect(() => replaceEnvVariables(content, { onError: (e) => context.failAndThrow(e) })).toThrow(RapiddocsCliError);
    });
});
