import { PostmanRequest } from "@rapiddocs-rapiddocs/postman-sdk/api";

export interface GeneratedRequest {
    get: () => PostmanRequest;
}
