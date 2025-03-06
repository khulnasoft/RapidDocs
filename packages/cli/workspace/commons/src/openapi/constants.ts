import { Config } from "@redocly/openapi-core";
import { BundleOptions } from "@redocly/openapi-core/lib/bundle";

import { RAPIDDOCS_TYPE_EXTENSIONS } from "@khulnasoft/openapi-ir-parser";

export const DEFAULT_OPENAPI_BUNDLE_OPTIONS: BundleOptions = {
    config: new Config(
        {
            apis: {},
            styleguide: {
                plugins: [RAPIDDOCS_TYPE_EXTENSIONS],
                rules: {
                    spec: "warn"
                }
            }
        },
        undefined
    ),
    dereference: false,
    removeUnusedComponents: false,
    keepUrlRefs: true
};
