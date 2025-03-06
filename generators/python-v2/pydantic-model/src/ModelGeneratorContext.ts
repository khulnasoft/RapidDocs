import { AbstractPythonGeneratorContext } from "@khulnasoft/base-python-generator";

import { PydanticModelCustomConfigSchema } from "./ModelCustomConfig";

export class PydanticModelGeneratorContext extends AbstractPythonGeneratorContext<PydanticModelCustomConfigSchema> {
    public getModulePathForId(typeId: string): string[] {
        const typeDeclaration = super.getTypeDeclarationOrThrow(typeId);
        const rapiddocsFilepath = typeDeclaration.name.rapiddocsFilepath;
        return [...rapiddocsFilepath.allParts.flatMap((part) => ["resources", super.getSnakeCaseSafeName(part)]), "types"];
    }
}
