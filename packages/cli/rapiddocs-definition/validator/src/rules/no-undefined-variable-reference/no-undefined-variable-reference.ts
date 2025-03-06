import {
    RapiddocsFileContext,
    VariableResolverImpl,
    constructRapiddocsFileContext,
    constructRootApiFileContext
} from "@khulnasoft/ir-generator";

import { Rule, RuleViolation } from "../../Rule";
import { CASINGS_GENERATOR } from "../../utils/casingsGenerator";

export const NoUndefinedVariableReferenceRule: Rule = {
    name: "no-undefined-variable-reference",
    create: ({ workspace }) => {
        const variableResolver = new VariableResolverImpl();

        const validateVariableReference = (variableReference: string, file: RapiddocsFileContext): RuleViolation[] => {
            if (!variableReference.startsWith(VariableResolverImpl.VARIABLE_PREFIX)) {
                return [
                    {
                        severity: "fatal",
                        message: `Variable reference must start with ${VariableResolverImpl.VARIABLE_PREFIX}`
                    }
                ];
            }

            if (variableResolver.getDeclaration(variableReference, file)) {
                return [];
            }

            return [
                {
                    severity: "fatal",
                    message: `Variable ${variableReference} is not defined.`
                }
            ];
        };

        return {
            rootApiFile: {
                variableReference: (variableReference) => {
                    return validateVariableReference(
                        variableReference,
                        constructRootApiFileContext({
                            casingsGenerator: CASINGS_GENERATOR,
                            rootApiFile: workspace.definition.rootApiFile.contents
                        })
                    );
                }
            },
            definitionFile: {
                variableReference: (variableReference, { relativeFilepath, contents }) => {
                    return validateVariableReference(
                        variableReference,
                        constructRapiddocsFileContext({
                            casingsGenerator: CASINGS_GENERATOR,
                            relativeFilepath,
                            definitionFile: contents,
                            rootApiFile: workspace.definition.rootApiFile.contents
                        })
                    );
                }
            }
        };
    }
};
