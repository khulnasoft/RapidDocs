import { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

import { TypeDeclaration } from "@khulnasoft/ir-sdk";

import { AbstractConverter } from "../../AbstractConverter";
import { ErrorCollector } from "../../ErrorCollector";
import { HttpMethods } from "../../constants/HttpMethods";
import { RapiddocsIdempotentExtension } from "../../extensions/x-rapiddocs-idempotent";
import { RapiddocsPaginationExtension } from "../../extensions/x-rapiddocs-pagination";
import { RapiddocsStreamingExtension } from "../../extensions/x-rapiddocs-streaming";
import { RapiddocsWebhookExtension } from "../../extensions/x-rapiddocs-webhook";
import { OpenAPIConverterContext3_1 } from "../OpenAPIConverterContext3_1";
import { OperationConverter } from "./operations/OperationConverter";
import { WebhookConverter } from "./operations/WebhookConverter";

export declare namespace PathConverter {
    export interface Args extends AbstractConverter.Args {
        pathItem: OpenAPIV3_1.PathItemObject;
        path: string;
    }

    export interface Output {
        endpoints: OperationConverter.Output[];
        webhooks: WebhookConverter.Output[];
        inlinedTypes: Record<string, TypeDeclaration>;
    }
}

export class PathConverter extends AbstractConverter<OpenAPIConverterContext3_1, PathConverter.Output> {
    private readonly pathItem: OpenAPIV3_1.PathItemObject;
    private readonly path: string;

    constructor({ breadcrumbs, pathItem, path }: PathConverter.Args) {
        super({ breadcrumbs });
        this.pathItem = pathItem;
        this.path = path;
    }

    public async convert({
        context,
        errorCollector
    }: {
        context: OpenAPIConverterContext3_1;
        errorCollector: ErrorCollector;
    }): Promise<PathConverter.Output | undefined> {
        const endpoints: OperationConverter.Output[] = [];
        const webhooks: WebhookConverter.Output[] = [];
        const inlinedTypes: Record<string, TypeDeclaration> = {};

        for (const method of HttpMethods) {
            const operation = this.pathItem[method];
            if (operation != null) {
                const operationBreadcrumbs = [...this.breadcrumbs, method];

                const webhookExtensionConverter = new RapiddocsWebhookExtension({
                    breadcrumbs: operationBreadcrumbs,
                    operation
                });
                const webhookExtension = webhookExtensionConverter.convert({ context, errorCollector });
                if (webhookExtension != null && webhookExtension === true) {
                    const webhookConverter = new WebhookConverter({
                        breadcrumbs: operationBreadcrumbs,
                        operation,
                        method: OpenAPIV3.HttpMethods[method.toUpperCase() as keyof typeof OpenAPIV3.HttpMethods],
                        path: this.path
                    });
                    const convertedWebhook = await webhookConverter.convert({ context, errorCollector });
                    if (convertedWebhook != null) {
                        webhooks.push(convertedWebhook);
                        Object.assign(inlinedTypes, convertedWebhook.inlinedTypes);
                    }
                    continue;
                }

                const streamingExtensionConverter = new RapiddocsStreamingExtension({
                    breadcrumbs: operationBreadcrumbs,
                    operation
                });
                const streamingExtension = streamingExtensionConverter.convert({ context, errorCollector });
                if (streamingExtension != null) {
                    // TODO: Use streaming extension to branch between streaming and non-streaming endpoints
                    // Use streamFormat to modify response conversion.
                }

                const paginationExtensionConverter = new RapiddocsPaginationExtension({
                    breadcrumbs: operationBreadcrumbs,
                    operation,
                    document: context.spec as OpenAPIV3.Document
                });
                const paginationExtension = paginationExtensionConverter.convert({ context, errorCollector });
                if (paginationExtension != null) {
                    // TODO: Use pagination extension to modify endpoint conversion.
                    // Correctly parse out the pagination ResponseProperty objects
                }

                const idempotentExtensionConverter = new RapiddocsIdempotentExtension({
                    breadcrumbs: operationBreadcrumbs,
                    operation
                });
                const idempotentExtension = idempotentExtensionConverter.convert({ context, errorCollector });

                const operationConverter = new OperationConverter({
                    breadcrumbs: operationBreadcrumbs,
                    operation,
                    method: OpenAPIV3.HttpMethods[method.toUpperCase() as keyof typeof OpenAPIV3.HttpMethods],
                    path: this.path,
                    idempotent: idempotentExtension
                });
                const convertedOperation = await operationConverter.convert({ context, errorCollector });
                if (convertedOperation != null) {
                    endpoints.push(convertedOperation);
                    Object.assign(inlinedTypes, convertedOperation.inlinedTypes);
                }
            }
        }

        return {
            endpoints,
            webhooks,
            inlinedTypes
        };
    }
}
