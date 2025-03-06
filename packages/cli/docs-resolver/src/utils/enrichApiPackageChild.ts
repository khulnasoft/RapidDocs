import { RapiddocsNavigation } from "@khulnasoft/fdr-sdk";

export function enrichApiPackageChild({
    child,
    nodeIdToSubpackageId,
    convertApiDefinitionPackageId,
    mergeAndFilterChildren
}: {
    child: RapiddocsNavigation.V1.ApiPackageChild;
    nodeIdToSubpackageId: Map<string, string[]>;
    convertApiDefinitionPackageId: (
        subpackageId: string,
        slug: RapiddocsNavigation.V1.SlugGenerator
    ) => RapiddocsNavigation.V1.ApiPackageChild[];
    mergeAndFilterChildren: (
        children: RapiddocsNavigation.V1.ApiPackageChild[],
        subpackageChildren: RapiddocsNavigation.V1.ApiPackageChild[]
    ) => RapiddocsNavigation.V1.ApiPackageChild[];
}): RapiddocsNavigation.V1.ApiPackageChild {
    if (child.type === "apiPackage") {
        // expand the subpackage to include children that haven't been visited yet
        const slug = RapiddocsNavigation.V1.SlugGenerator.init(child.slug);
        const subpackageIds = nodeIdToSubpackageId.get(child.id) ?? [];
        const subpackageChildren = subpackageIds.flatMap((subpackageId) =>
            convertApiDefinitionPackageId(subpackageId, slug)
        );

        // recursively apply enrichment to children
        const enrichedChildren = child.children.map((innerChild) =>
            enrichApiPackageChild({
                child: innerChild,
                nodeIdToSubpackageId,
                convertApiDefinitionPackageId,
                mergeAndFilterChildren
            })
        );

        // combine children with subpackage (tacked on at the end to preserve order)
        const children = mergeAndFilterChildren(enrichedChildren, subpackageChildren);

        return {
            ...child,
            children,
            pointsTo: undefined
        };
    }
    return child;
}
