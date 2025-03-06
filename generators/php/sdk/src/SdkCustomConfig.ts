import { z } from "zod";

import { BasePhpCustomConfigSchema } from "@khulnasoft/php-codegen";

export const SdkCustomConfigSchema = z
    .strictObject({
        // Deprecated; use clientName instead.
        "client-class-name": z.string().optional()
    })
    .extend(BasePhpCustomConfigSchema.shape);

export type SdkCustomConfigSchema = z.infer<typeof SdkCustomConfigSchema>;
