/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.object.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.object.core.ObjectMappers;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = ObjectTypeWithMapAliasTypeKey.Builder.class)
public final class ObjectTypeWithMapAliasTypeKey {
    private final Map<AliasPropertyType, String> prop;

    private ObjectTypeWithMapAliasTypeKey(Map<AliasPropertyType, String> prop) {
        this.prop = prop;
    }

    @JsonProperty("prop")
    public Map<AliasPropertyType, String> getProp() {
        return prop;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof ObjectTypeWithMapAliasTypeKey && equalTo((ObjectTypeWithMapAliasTypeKey) other);
    }

    private boolean equalTo(ObjectTypeWithMapAliasTypeKey other) {
        return prop.equals(other.prop);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.prop);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder {
        private Map<AliasPropertyType, String> prop = new LinkedHashMap<>();

        private Builder() {}

        public Builder from(ObjectTypeWithMapAliasTypeKey other) {
            prop(other.getProp());
            return this;
        }

        @JsonSetter(value = "prop", nulls = Nulls.SKIP)
        public Builder prop(Map<AliasPropertyType, String> prop) {
            this.prop.clear();
            this.prop.putAll(prop);
            return this;
        }

        public Builder putAllProp(Map<AliasPropertyType, String> prop) {
            this.prop.putAll(prop);
            return this;
        }

        public Builder prop(AliasPropertyType key, String value) {
            this.prop.put(key, value);
            return this;
        }

        public ObjectTypeWithMapAliasTypeKey build() {
            return new ObjectTypeWithMapAliasTypeKey(prop);
        }
    }
}
