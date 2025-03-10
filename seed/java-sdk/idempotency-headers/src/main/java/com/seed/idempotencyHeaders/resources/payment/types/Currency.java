/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.idempotencyHeaders.resources.payment.types;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Currency {
    USD("USD"),

    YEN("YEN");

    private final String value;

    Currency(String value) {
        this.value = value;
    }

    @JsonValue
    @java.lang.Override
    public String toString() {
        return this.value;
    }
}
