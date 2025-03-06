import { Values } from "@khulnasoft/core-utils";

export const ReadmeOpenAPIExtension = {
    /**
     * Migrate from readme extensions to rapiddocs IR.
     *
     * https://docs.readme.com/main/docs/openapi-extensions
     */
    README_EXT: "x-readme"
};

export type ReadmeOpenAPIExtension = Values<typeof ReadmeOpenAPIExtension>;
