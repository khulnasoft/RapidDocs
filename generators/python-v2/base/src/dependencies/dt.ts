import { python } from "@khulnasoft/python-ast";

export const datetime = python.reference({
    name: "datetime",
    modulePath: ["dt"]
});
