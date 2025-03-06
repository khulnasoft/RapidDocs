import { OpenAPIV3 } from "openapi-types";
import { z } from "zod";

import { getExtensionAndValidate } from "../../../getExtension";
import { OpenAPIV3ParserContext } from "../OpenAPIV3ParserContext";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export const XRapiddocsGroupsSchema = z.record(
    z.string(),
    z.object({
        summary: z.string().optional(),
        description: z.string().optional()
    })
);
export type XRapiddocsGroupsSchema = z.infer<typeof XRapiddocsGroupsSchema>;

export function getRapiddocsGroups({
    document,
    context
}: {
    document: OpenAPIV3.Document;
    context: OpenAPIV3ParserContext;
}): XRapiddocsGroupsSchema | undefined {
    return getExtensionAndValidate<XRapiddocsGroupsSchema>(
        document,
        RapiddocsOpenAPIExtension.GROUPS,
        XRapiddocsGroupsSchema,
        context.logger
    );
}
