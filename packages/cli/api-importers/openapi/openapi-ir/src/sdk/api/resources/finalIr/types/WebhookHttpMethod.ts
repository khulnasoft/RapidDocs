/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

export type WebhookHttpMethod = "GET" | "POST";
export const WebhookHttpMethod = {
    Get: "GET",
    Post: "POST",
    _visit: <R>(value: WebhookHttpMethod, visitor: WebhookHttpMethod.Visitor<R>) => {
        switch (value) {
            case WebhookHttpMethod.Get:
                return visitor.get();
            case WebhookHttpMethod.Post:
                return visitor.post();
            default:
                return visitor._other();
        }
    },
} as const;

export namespace WebhookHttpMethod {
    export interface Visitor<R> {
        get: () => R;
        post: () => R;
        _other: () => R;
    }
}
