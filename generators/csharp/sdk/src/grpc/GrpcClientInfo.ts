import { csharp } from "@khulnasoft/csharp-codegen";

import { ProtobufService } from "@rapiddocs-rapiddocs/ir-sdk/api";

/**
 * Information relevant to a particular gRPC client instance instantiated from a gRPC
 * channel (e.g. `var _userService = new UserService.UserServiceClient(channel);`).
 */
export interface GrpcClientInfo {
    privatePropertyName: string;
    classReference: csharp.ClassReference;
    protobufService: ProtobufService;
}
