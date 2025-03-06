import { docsYml } from "@khulnasoft/configuration";

import { scrapedNavigation } from "./scrapedNavigation";
import { scrapedTab } from "./scrapedTab";

export interface ScrapeResult {
    success: boolean;
    message?: string;
    data?: {
        name: string;
        logo: docsYml.RawSchemas.LogoConfiguration | undefined;
        navigation: scrapedNavigation;
        tabs: Array<scrapedTab>;
        favicon: string;
        colors: docsYml.RawSchemas.ColorsConfiguration;
    };
}
