import { docsYml } from "@khulnasoft/configuration";
import { isNonNullish } from "@khulnasoft/core-utils";
import { RapiddocsDocsBuilder } from "@khulnasoft/docs-importer-commons";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { convertMarkdown } from "../converters/convertMarkdown";
import { scrapedNavigationGroup } from "../types/scrapedNavigation";

export declare namespace convertNavigationItem {
    interface Args {
        absolutePathToOutput: AbsoluteFilePath;
        builder: RapiddocsDocsBuilder;
        context: TaskContext;
        item: scrapedNavigationGroup;
    }
}

export async function convertNavigationItem({
    absolutePathToOutput,
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

                        const absoluteFilepathToMarkdown = join(absolutePathToOutput, relativeFilepathFromRoot);
                        const fileExists = await doesPathExist(absolutePathToOutput);
                        if (!fileExists) {
                            return undefined;
                        }

                        const convertedMarkdown = await convertMarkdown({
                            relativeFilepathFromRoot,
                            absoluteFilepathToMarkdown
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
                        return await convertNavigationItem({ absolutePathToOutput, item, builder, context });
                    }
                })
            )
        ).filter(isNonNullish)
    };
    return section;
}
