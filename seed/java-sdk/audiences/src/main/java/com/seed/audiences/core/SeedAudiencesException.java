/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.audiences.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedAudiencesException extends RuntimeException {
    public SeedAudiencesException(String message) {
        super(message);
    }

    public SeedAudiencesException(String message, Exception e) {
        super(message, e);
    }
}
