/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.queryParameters.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedQueryParametersException extends RuntimeException {
    public SeedQueryParametersException(String message) {
        super(message);
    }

    public SeedQueryParametersException(String message, Exception e) {
        super(message, e);
    }
}
