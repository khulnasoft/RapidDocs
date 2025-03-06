import { RapiddocsWorkspace, getDefinitionFile } from "@khulnasoft/api-workspace-commons";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

import { RapiddocsFileContext, constructRapiddocsFileContext } from "../RapiddocsFileContext";
import { parseReferenceToTypeName } from "../utils/parseReferenceToTypeName";

export interface ErrorResolver {
    getDeclarationOrThrow(
        referenceToError: string,
        file: RapiddocsFileContext
    ): { declaration: RawSchemas.ErrorDeclarationSchema; file: RapiddocsFileContext };
    getDeclaration(
        referenceToError: string,
        file: RapiddocsFileContext
    ): { declaration: RawSchemas.ErrorDeclarationSchema; file: RapiddocsFileContext } | undefined;
}

export class ErrorResolverImpl implements ErrorResolver {
    constructor(private readonly workspace: RapiddocsWorkspace) {}

    public getDeclarationOrThrow(
        referenceToError: string,
        file: RapiddocsFileContext
    ): { declaration: RawSchemas.ErrorDeclarationSchema; file: RapiddocsFileContext } {
        const declaration = this.getDeclaration(referenceToError, file);
        if (declaration == null) {
            throw new Error("Error does not exist: " + referenceToError);
        }
        return declaration;
    }

    public getDeclaration(
        referenceToError: string,
        file: RapiddocsFileContext
    ): { declaration: RawSchemas.ErrorDeclarationSchema; file: RapiddocsFileContext } | undefined {
        const parsedReference = parseReferenceToTypeName({
            reference: referenceToError,
            referencedIn: file.relativeFilepath,
            imports: file.imports
        });

        if (parsedReference == null) {
            return undefined;
        }

        const definitionFile = getDefinitionFile(this.workspace, parsedReference.relativeFilepath);
        if (definitionFile == null) {
            return undefined;
        }

        const declaration = definitionFile.errors?.[parsedReference.typeName];
        if (declaration == null) {
            return undefined;
        }

        return {
            declaration,
            file: constructRapiddocsFileContext({
                definitionFile,
                relativeFilepath: parsedReference.relativeFilepath,
                casingsGenerator: file.casingsGenerator,
                rootApiFile: this.workspace.definition.rootApiFile.contents
            })
        };
    }
}
