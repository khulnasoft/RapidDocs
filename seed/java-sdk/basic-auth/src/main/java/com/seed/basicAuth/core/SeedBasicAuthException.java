/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.basicAuth.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedBasicAuthException extends RuntimeException {
    public SeedBasicAuthException(String message) {
        super(message);
    }

    public SeedBasicAuthException(String message, Exception e) {
        super(message, e);
    }
}
