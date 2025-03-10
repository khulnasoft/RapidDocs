/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.object.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedObjectException extends RuntimeException {
    public SeedObjectException(String message) {
        super(message);
    }

    public SeedObjectException(String message, Exception e) {
        super(message, e);
    }
}
