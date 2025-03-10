/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../index";

export interface EndpointReference {
    endpointId: RapiddocsIr.EndpointId;
    serviceId: RapiddocsIr.ServiceId;
    /**
     * The subpackage that defines the endpoint. If empty, the endpoint is
     * defined in the root package.
     */
    subpackageId: RapiddocsIr.SubpackageId | undefined;
}
