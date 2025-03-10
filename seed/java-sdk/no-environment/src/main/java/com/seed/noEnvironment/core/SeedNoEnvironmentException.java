/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.noEnvironment.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedNoEnvironmentException extends RuntimeException {
    public SeedNoEnvironmentException(String message) {
        super(message);
    }

    public SeedNoEnvironmentException(String message, Exception e) {
        super(message, e);
    }
}
