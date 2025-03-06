import { GetReferenceOpts } from "@rapiddocs-typescript/commons";
import { SdkContext } from "@rapiddocs-typescript/contexts";
import { OptionalKind, ParameterDeclarationStructure, ts } from "ts-morph";

import { ExampleEndpointCall, HttpEndpoint } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedEndpointResponse } from "./default/endpoint-response/GeneratedEndpointResponse";

export interface EndpointSignature {
    parameters: OptionalKind<ParameterDeclarationStructure>[];
    returnTypeWithoutPromise: ts.TypeNode;
}

export interface GeneratedEndpointImplementation {
    endpoint: HttpEndpoint;
    response: GeneratedEndpointResponse;
    getStatements: (context: SdkContext) => ts.Statement[];
    getOverloads: (context: SdkContext) => EndpointSignature[];
    getSignature: (context: SdkContext) => EndpointSignature;
    getDocs: (context: SdkContext) => string | undefined;
    getExample: (args: {
        context: SdkContext;
        example: ExampleEndpointCall;
        opts: GetReferenceOpts;
        clientReference: ts.Identifier;
    }) => ts.Expression | undefined;

    maybeLeverageInvocation: (args: { context: SdkContext; invocation: ts.Expression }) => ts.Node[] | undefined;
}
