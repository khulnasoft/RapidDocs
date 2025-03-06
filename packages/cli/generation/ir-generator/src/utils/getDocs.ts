import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

export function getDocs(field: RawSchemas.WithDocsSchema | string): string | undefined {
    if (typeof field === "string") {
        return undefined;
    }
    return field.docs;
}
