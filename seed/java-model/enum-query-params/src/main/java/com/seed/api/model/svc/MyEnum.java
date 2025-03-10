/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.api.model.svc;

import com.fasterxml.jackson.annotation.JsonValue;

public enum MyEnum {
    ONE("one"),

    TWO("two"),

    THREE("three"),

    FOUR("four");

    private final String value;

    MyEnum(String value) {
        this.value = value;
    }

    @JsonValue
    @java.lang.Override
    public String toString() {
        return this.value;
    }
}
