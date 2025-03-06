import { docsYml } from "@khulnasoft/configuration";
import { isNonNullish } from "@khulnasoft/core-utils";
import { RapiddocsDocsBuilder } from "@khulnasoft/docs-importer-commons";
import { AbsoluteFilePath, RelativeFilePath, dirname, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { convertMarkdown } from "./convertMarkdown";
import { MintNavigationItem } from "./mintlify";

export declare namespace convertNavigationItem {
    interface Args {
        absolutePathToMintJson: AbsoluteFilePath;
        builder: RapiddocsDocsBuilder;
        context: TaskContext;
        item: MintNavigationItem;
    }
}

export async function convertNavigationItem({
    absolutePathToMintJson,
    item,
    builder,
    context
}: convertNavigationItem.Args): Promise<docsYml.RawSchemas.NavigationItem | undefined> {
    const section: docsYml.RawSchemas.SectionConfiguration = {
        section: item.group,
        contents: (
            await Promise.all(
                item.pages.map(async (item): Promise<docsYml.RawSchemas.NavigationItem | undefined> => {
                    if (typeof item === "string") {
                        const relativeFilepathFromRoot = RelativeFilePath.of(
                            item.endsWith("mdx") ? item : `${item}.mdx`
                        );

                        const absoluteFilepathToMarkdown = join(
                            dirname(absolutePathToMintJson),
                            relativeFilepathFromRoot
                        );

                        const fileExists = await doesPathExist(absoluteFilepathToMarkdown);

                        if (!fileExists) {
                            return undefined;
                        }

                        const convertedMarkdown = await convertMarkdown({
                            absolutePathToMintJson,
                            relativeFilepathFromRoot,
                            absoluteFilepathToMarkdown,
                            builder
                        });

                        if (convertedMarkdown.mintlifyFrontmatter.openapi != null) {
                            return undefined;
                        }

                        builder.addMarkdownPage({
                            frontmatter: convertedMarkdown.frontmatter,
                            markdown: convertedMarkdown.content,
                            relativeFilePathFromDocsYml: relativeFilepathFromRoot
                        });
                        return {
                            page: convertedMarkdown.sidebarTitle ?? "",
                            icon: convertedMarkdown.mintlifyFrontmatter.icon,
                            path: relativeFilepathFromRoot
                        };
                    } else {
                        return await convertNavigationItem({ absolutePathToMintJson, item, builder, context });
                    }
                })
            )
        ).filter(isNonNullish)
    };
    return section;
}
