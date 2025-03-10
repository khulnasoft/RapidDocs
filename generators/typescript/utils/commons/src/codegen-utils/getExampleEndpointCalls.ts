import { ExampleEndpointCall, HttpEndpoint } from "@rapiddocs-rapiddocs/ir-sdk/api";

export function getExampleEndpointCalls(endpoint: HttpEndpoint): ExampleEndpointCall[] {
    // If any of the examples are user provided, we should only include those.
    if (endpoint.userSpecifiedExamples.length > 0) {
        const examples: ExampleEndpointCall[] = [];
        for (const userDefinedExample of endpoint.userSpecifiedExamples) {
            if (userDefinedExample.example != null) {
                examples.push(userDefinedExample.example);
            }
        }
        return examples;
    }
    // Otherwise we should only include a single one of the generated examples.
    for (const autogenerated of endpoint.autogeneratedExamples) {
        if (autogenerated.example != null) {
            return [autogenerated.example];
        }
    }
    return [];
}
