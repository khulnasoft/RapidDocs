import path from "path";

import { ReferenceConfigBuilder } from "@khulnasoft/base-generator";

import { RapiddocsGeneratorCli } from "@rapiddocs-rapiddocs/generator-cli-sdk";
import { HttpEndpoint, HttpService, ServiceId } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { SdkGeneratorContext } from "../SdkGeneratorContext";
import { EndpointSignatureInfo } from "../endpoint/EndpointSignatureInfo";
import { SingleEndpointSnippet } from "../endpoint/snippets/EndpointSnippetsGenerator";

export function buildReference({ context }: { context: SdkGeneratorContext }): ReferenceConfigBuilder {
    const builder = new ReferenceConfigBuilder();
    for (const [serviceId, service] of Object.entries(context.ir.services)) {
        const section = isRootServiceId({ context, serviceId })
            ? builder.addRootSection()
            : builder.addSection({ title: getSectionTitle({ service }) });
        const endpoints = getEndpointReferencesForService({ context, serviceId, service });
        for (const endpoint of endpoints) {
            section.addEndpoint(endpoint);
        }
    }
    return builder;
}

function getEndpointReferencesForService({
    context,
    serviceId,
    service
}: {
    context: SdkGeneratorContext;
    serviceId: ServiceId;
    service: HttpService;
}): RapiddocsGeneratorCli.EndpointReference[] {
    const result: RapiddocsGeneratorCli.EndpointReference[] = [];
    for (const endpoint of service.endpoints) {
        const singleEndpointSnippet = context.snippetGenerator.generateSingleEndpointSnippet({
            serviceId,
            endpoint,
            example: context.getExampleEndpointCallOrThrow(endpoint)
        });
        if (singleEndpointSnippet != null) {
            const endpointSignatureInfo = context.endpointGenerator.getEndpointSignatureInfo({
                serviceId,
                endpoint
            });
            result.push(
                getEndpointReference({
                    context,
                    serviceId,
                    service,
                    endpoint,
                    endpointSignatureInfo,
                    singleEndpointSnippet
                })
            );
        }
    }
    return result;
}

function getEndpointReference({
    context,
    serviceId,
    service,
    endpoint,
    endpointSignatureInfo,
    singleEndpointSnippet,
    isPager = false
}: {
    context: SdkGeneratorContext;
    serviceId: ServiceId;
    service: HttpService;
    endpoint: HttpEndpoint;
    endpointSignatureInfo: EndpointSignatureInfo;
    singleEndpointSnippet: SingleEndpointSnippet;
    isPager?: boolean;
}): RapiddocsGeneratorCli.EndpointReference {
    return {
        title: {
            snippetParts: [
                {
                    text: context.getAccessFromRootClient(service.name.rapiddocsFilepath) + "."
                },
                {
                    text: context.getEndpointMethodName(endpoint),
                    location: {
                        path: getServiceFilepath({ context, serviceId, service })
                    }
                },
                {
                    text: getReferenceEndpointInvocationParameters({ context, endpointSignatureInfo })
                }
            ],
            returnValue:
                endpointSignatureInfo.returnType != null
                    ? {
                          text: context.printType(endpointSignatureInfo.returnType)
                      }
                    : undefined
        },
        description: endpoint.docs,
        snippet: singleEndpointSnippet.endpointCall.trim(),
        parameters: endpointSignatureInfo.baseParameters.map((parameter) => {
            return {
                name: parameter.name,
                type: context.printType(parameter.type),
                description: parameter.docs,
                required: !parameter.type.isOptional()
            };
        })
    };
}

function getReferenceEndpointInvocationParameters({
    context,
    endpointSignatureInfo
}: {
    context: SdkGeneratorContext;
    endpointSignatureInfo: EndpointSignatureInfo;
}): string {
    let result = "";
    endpointSignatureInfo.pathParameters.forEach((pathParameter, index) => {
        if (index > 0) {
            result += ", ";
        }
        result += pathParameter.name;
    });
    if (endpointSignatureInfo.requestParameter != null) {
        if (result.length > 0) {
            result += ", ";
        }
        result += `${context.printType(endpointSignatureInfo.requestParameter.type)} { ... }`;
    }
    return `(${result})`;
}

function getServiceFilepath({
    context,
    serviceId,
    service
}: {
    context: SdkGeneratorContext;
    serviceId: ServiceId;
    service: HttpService;
}): string {
    const subpackage = context.getSubpackageForServiceId(serviceId);
    const clientClassReference = subpackage
        ? context.getSubpackageClassReference(subpackage)
        : context.getRootClientClassReferenceForSnippets();

    return (
        "/" +
        path.join(
            context.project.getProjectDirectory(),
            context.getDirectoryForRapiddocsFilepath(service.name.rapiddocsFilepath),
            `${clientClassReference.name}.cs`
        )
    );
}

function isRootServiceId({ context, serviceId }: { context: SdkGeneratorContext; serviceId: ServiceId }): boolean {
    return context.ir.rootPackage.service === serviceId;
}

function getSectionTitle({ service }: { service: HttpService }): string {
    return service.displayName ?? service.name.rapiddocsFilepath.allParts.map((part) => part.pascalCase.safeName).join(" ");
}
