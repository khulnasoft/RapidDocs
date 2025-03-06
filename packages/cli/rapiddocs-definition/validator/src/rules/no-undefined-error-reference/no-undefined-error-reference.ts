import { mapValues } from "lodash-es";

import { RapiddocsWorkspace, visitAllDefinitionFiles } from "@khulnasoft/api-workspace-commons";
import { DefinitionFileSchema, RootApiFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/fs-utils";
import { parseReferenceToTypeName } from "@khulnasoft/ir-generator";

import { Rule, RuleViolation } from "../../Rule";
import { visitDefinitionFileYamlAst } from "../../ast";

type ErrorName = string;

export const NoUndefinedErrorReferenceRule: Rule = {
    name: "no-undefined-error-reference",
    create: ({ workspace }) => {
        const errorsByFilepath: Record<RelativeFilePath, Set<ErrorName>> = getErrorsByFilepath(workspace);

        function doesErrorExist(errorName: string, relativeFilepath: RelativeFilePath) {
            const errorsForFilepath = errorsByFilepath[relativeFilepath];
            if (errorsForFilepath == null) {
                return false;
            }
            return errorsForFilepath.has(errorName);
        }

        const validateErrorReference = (
            errorReference: string,
            relativeFilepath: RelativeFilePath,
            contents: DefinitionFileSchema | RootApiFileSchema
        ): RuleViolation[] => {
            const parsedReference = parseReferenceToTypeName({
                reference: errorReference,
                referencedIn: relativeFilepath,
                imports: mapValues(contents.imports ?? {}, RelativeFilePath.of)
            });

            if (parsedReference != null && doesErrorExist(parsedReference.typeName, parsedReference.relativeFilepath)) {
                return [];
            }

            return [
                {
                    severity: "fatal",
                    message: "Error is not defined."
                }
            ];
        };

        return {
            rootApiFile: {
                errorReference: (errorReference, { relativeFilepath, contents }) => {
                    return validateErrorReference(errorReference, relativeFilepath, contents);
                }
            },
            definitionFile: {
                errorReference: (errorReference, { relativeFilepath, contents }) => {
                    return validateErrorReference(errorReference, relativeFilepath, contents);
                }
            }
        };
    }
};

function getErrorsByFilepath(workspace: RapiddocsWorkspace) {
    const errorsByFilepath: Record<RelativeFilePath, Set<ErrorName>> = {};

    visitAllDefinitionFiles(workspace, (relativeFilepath, file) => {
        const errorsForFile = new Set<ErrorName>();
        errorsByFilepath[relativeFilepath] = errorsForFile;

        visitDefinitionFileYamlAst(file, {
            errorDeclaration: ({ errorName }) => {
                errorsForFile.add(errorName);
            }
        });
    });

    return errorsByFilepath;
}
