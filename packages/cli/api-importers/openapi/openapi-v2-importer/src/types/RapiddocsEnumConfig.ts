export type RapiddocsEnumConfig = Record<
    string,
    {
        description?: string;
        name?: string;
        casing?: {
            snake?: string;
            camel?: string;
            screamingSnake?: string;
            pascal?: string;
        };
    }
>;
