/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.responseProperty.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedResponsePropertyException extends RuntimeException {
    public SeedResponsePropertyException(String message) {
        super(message);
    }

    public SeedResponsePropertyException(String message, Exception e) {
        super(message, e);
    }
}
