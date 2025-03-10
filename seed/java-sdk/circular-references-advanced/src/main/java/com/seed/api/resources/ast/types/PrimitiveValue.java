/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.api.resources.ast.types;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PrimitiveValue {
    STRING("STRING"),

    NUMBER("NUMBER");

    private final String value;

    PrimitiveValue(String value) {
        this.value = value;
    }

    @JsonValue
    @java.lang.Override
    public String toString() {
        return this.value;
    }
}
