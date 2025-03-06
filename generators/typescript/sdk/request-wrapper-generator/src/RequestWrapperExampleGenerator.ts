import { PackageId } from "@rapiddocs-typescript/commons";
import { GeneratedRequestWrapperExample } from "@rapiddocs-typescript/contexts";

import { ExampleEndpointCall, HttpRequestBody, Name } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { GeneratedRequestWrapperExampleImpl } from "./GeneratedRequestWrapperExampleImpl";

export class RequestWrapperExampleGenerator {
    public generateExample({
        bodyPropertyName,
        example,
        packageId,
        endpointName,
        requestBody
    }: {
        bodyPropertyName: string;
        example: ExampleEndpointCall;
        packageId: PackageId;
        endpointName: Name;
        requestBody: HttpRequestBody | undefined;
    }): GeneratedRequestWrapperExample {
        return new GeneratedRequestWrapperExampleImpl({
            bodyPropertyName,
            example,
            packageId,
            endpointName,
            requestBody
        });
    }
}
