/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.customAuth.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedCustomAuthException extends RuntimeException {
    public SeedCustomAuthException(String message) {
        super(message);
    }

    public SeedCustomAuthException(String message, Exception e) {
        super(message, e);
    }
}
