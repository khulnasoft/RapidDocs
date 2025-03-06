import { RapiddocsDefinitionFileFormatter } from "./RapiddocsDefinitionFileFormatter";

export async function formatDefinitionFile({ fileContents }: { fileContents: string }): Promise<string> {
    const formatter = new RapiddocsDefinitionFileFormatter({
        fileContents
    });
    return await formatter.format();
}
