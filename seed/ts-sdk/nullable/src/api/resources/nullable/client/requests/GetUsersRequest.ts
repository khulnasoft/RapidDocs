/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

/**
 * @example
 *     {
 *         usernames: "usernames",
 *         avatar: "avatar",
 *         activated: true,
 *         tags: "tags",
 *         extra: true
 *     }
 */
export interface GetUsersRequest {
    usernames?: string | string[];
    avatar?: string;
    activated?: boolean | boolean[];
    tags?: (string | null) | (string | null)[];
    extra?: boolean | null;
}
