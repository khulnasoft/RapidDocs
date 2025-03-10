/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../../../index";

/**
 * This represents the IR required to generate dynamic snippets.
 *
 * This IR minimizes the space required to generate snippets in a variety
 * of environments (e.g. web, offline, etc).
 */
export interface DynamicIntermediateRepresentation {
    /**
     * The version of the dynamic IR. This is independent from the version
     * of the primary IR.
     */
    version: "1.0.0";
    types: Record<RapiddocsIr.TypeId, RapiddocsIr.dynamic.NamedType>;
    endpoints: Record<RapiddocsIr.EndpointId, RapiddocsIr.dynamic.Endpoint>;
    environments: RapiddocsIr.EnvironmentsConfig | undefined;
    /**
     * The headers that are required on every request. These headers
     * are typically included in the SDK's client constructor.
     */
    headers: RapiddocsIr.dynamic.NamedParameter[] | undefined;
    /**
     * The path parameters that are required on every request. These
     * path parameters are typically included in the SDK's client
     * constructor.
     */
    pathParameters: RapiddocsIr.dynamic.NamedParameter[] | undefined;
    generatorConfig: RapiddocsIr.dynamic.GeneratorConfig | undefined;
}
