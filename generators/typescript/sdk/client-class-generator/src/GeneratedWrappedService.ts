import { Reference, getTextOfTsNode } from "@rapiddocs-typescript/commons";
import { SdkContext } from "@rapiddocs-typescript/contexts";
import { ClassDeclarationStructure, Scope, ts } from "ts-morph";

import { SetRequired } from "@khulnasoft/core-utils";

import { Subpackage, SubpackageId } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedSdkClientClassImpl } from "./GeneratedSdkClientClassImpl";
import { OAuthTokenProviderGenerator } from "./oauth-generator/OAuthTokenProviderGenerator";

export declare namespace GeneratedWrappedService {
    interface Init {
        wrapperService: GeneratedSdkClientClassImpl;
        wrappedSubpackageId: SubpackageId;
        wrappedSubpackage: Subpackage;
    }
}

export class GeneratedWrappedService {
    private wrapperService: GeneratedSdkClientClassImpl;
    private wrappedSubpackageId: SubpackageId;
    private wrappedSubpackage: Subpackage;

    constructor({ wrapperService, wrappedSubpackageId, wrappedSubpackage }: GeneratedWrappedService.Init) {
        this.wrapperService = wrapperService;
        this.wrappedSubpackageId = wrappedSubpackageId;
        this.wrappedSubpackage = wrappedSubpackage;
    }

    public addToServiceClass({
        isRoot,
        class_,
        context
    }: {
        isRoot: boolean;
        class_: SetRequired<ClassDeclarationStructure, "properties" | "ctors" | "methods" | "getAccessors">;
        context: SdkContext;
    }): void {
        const referenceToWrapped = this.getReferenceToWrappedService(class_, context);
        const generatedWrappedService = context.sdkClientClass.getGeneratedSdkClientClass({
            isRoot: false,
            subpackageId: this.wrappedSubpackageId
        });

        class_.properties.push({
            name: this.getCachedMemberName(),
            scope: Scope.Protected,
            type: getTextOfTsNode(
                ts.factory.createUnionTypeNode([
                    referenceToWrapped.getTypeNode(),
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
                ])
            )
        });

        if (isRoot && context.generateOAuthClients) {
            class_.getAccessors.push({
                name: this.getGetterName(),
                returnType: getTextOfTsNode(referenceToWrapped.getTypeNode()),
                scope: Scope.Public,
                statements: [
                    getTextOfTsNode(
                        ts.factory.createReturnStatement(
                            ts.factory.createParenthesizedExpression(
                                ts.factory.createBinaryExpression(
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createThis(),
                                        this.getCachedMemberName()
                                    ),
                                    ts.SyntaxKind.QuestionQuestionEqualsToken,
                                    ts.factory.createNewExpression(referenceToWrapped.getExpression(), undefined, [
                                        ts.factory.createObjectLiteralExpression(
                                            [
                                                ts.factory.createSpreadAssignment(
                                                    this.wrapperService.getReferenceToOptions()
                                                ),
                                                ts.factory.createPropertyAssignment(
                                                    ts.factory.createIdentifier(
                                                        OAuthTokenProviderGenerator.OAUTH_TOKEN_PROPERTY_NAME
                                                    ),
                                                    ts.factory.createArrowFunction(
                                                        [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
                                                        undefined,
                                                        [],
                                                        undefined,
                                                        ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                                                        ts.factory.createAwaitExpression(
                                                            ts.factory.createCallExpression(
                                                                ts.factory.createPropertyAccessExpression(
                                                                    ts.factory.createPropertyAccessExpression(
                                                                        ts.factory.createThis(),
                                                                        ts.factory.createIdentifier(
                                                                            OAuthTokenProviderGenerator.OAUTH_TOKEN_PROVIDER_PROPERTY_NAME
                                                                        )
                                                                    ),
                                                                    ts.factory.createIdentifier(
                                                                        OAuthTokenProviderGenerator.OAUTH_GET_TOKEN_METHOD_NAME
                                                                    )
                                                                ),
                                                                undefined,
                                                                []
                                                            )
                                                        )
                                                    )
                                                )
                                            ],
                                            true
                                        )
                                    ])
                                )
                            )
                        )
                    )
                ]
            });
            return;
        }
        class_.getAccessors.push({
            name: this.getGetterName(),
            returnType: getTextOfTsNode(referenceToWrapped.getTypeNode()),
            scope: Scope.Public,
            statements: [
                getTextOfTsNode(
                    ts.factory.createReturnStatement(
                        ts.factory.createParenthesizedExpression(
                            ts.factory.createBinaryExpression(
                                ts.factory.createPropertyAccessExpression(
                                    ts.factory.createThis(),
                                    this.getCachedMemberName()
                                ),
                                ts.SyntaxKind.QuestionQuestionEqualsToken,
                                generatedWrappedService.instantiate({
                                    referenceToClient: referenceToWrapped.getExpression(),
                                    referenceToOptions: this.wrapperService.getReferenceToOptions()
                                })
                            )
                        )
                    )
                )
            ]
        });
    }

    private getCachedMemberName(): string {
        return `_${this.getGetterName()}`;
    }

    private getGetterName(): string {
        const lastRapiddocsFilepathPart =
            this.wrappedSubpackage.rapiddocsFilepath.allParts[this.wrappedSubpackage.rapiddocsFilepath.allParts.length - 1];
        if (lastRapiddocsFilepathPart == null) {
            throw new Error("Cannot generate wrapped service because RapiddocsFilepath is empty");
        }
        return lastRapiddocsFilepathPart.camelCase.unsafeName;
    }

    private getReferenceToWrappedService(
        serviceClass: SetRequired<ClassDeclarationStructure, "properties" | "ctors" | "methods">,
        context: SdkContext
    ): Reference {
        const reference = context.sdkClientClass.getReferenceToClientClass({
            isRoot: false,
            subpackageId: this.wrappedSubpackageId
        });
        const wrappedServiceClassName = getTextOfTsNode(
            reference.getTypeNode({
                // we don't want to add the import unnecessarily
                isForComment: true
            })
        );

        if (wrappedServiceClassName !== serviceClass.name) {
            return reference;
        } else {
            return context.sdkClientClass.getReferenceToClientClass(
                { isRoot: false, subpackageId: this.wrappedSubpackageId },
                {
                    importAlias: `${wrappedServiceClassName}_`
                }
            );
        }
    }
}
