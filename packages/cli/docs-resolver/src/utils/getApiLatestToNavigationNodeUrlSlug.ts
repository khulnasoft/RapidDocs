import { kebabCase } from "lodash-es";

import { RapiddocsNavigation } from "@khulnasoft/fdr-sdk";

export function getApiLatestToNavigationNodeUrlSlug<T extends { id: string; operationId?: string }>({
    item,
    parentSlug
}: {
    item: T;
    parentSlug: RapiddocsNavigation.V1.SlugGenerator;
}): RapiddocsNavigation.V1.Slug {
    return parentSlug.apply({ urlSlug: kebabCase(item.id.split(".").pop() ?? "") }).get();
}
