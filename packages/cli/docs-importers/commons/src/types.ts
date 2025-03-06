import { RapiddocsDocsNavigationBuilder } from "./RapiddocsDocsBuilder";

export interface TabInfo {
    name: string;
    url: string;
    navigationBuilder: RapiddocsDocsNavigationBuilder;
}
