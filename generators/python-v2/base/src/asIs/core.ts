import { python } from "@khulnasoft/python-ast";

export const serialize_datetime = python.reference({
    modulePath: ["core", "datetime_utils"],
    name: "serialize_datetime"
});
