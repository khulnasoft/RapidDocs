/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.trace.resources.commons.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.trace.core.ObjectMappers;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = DoublyLinkedListValue.Builder.class)
public final class DoublyLinkedListValue {
    private final Optional<String> head;

    private final Map<String, DoublyLinkedListNodeValue> nodes;

    private final Map<String, Object> additionalProperties;

    private DoublyLinkedListValue(
            Optional<String> head,
            Map<String, DoublyLinkedListNodeValue> nodes,
            Map<String, Object> additionalProperties) {
        this.head = head;
        this.nodes = nodes;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("head")
    public Optional<String> getHead() {
        return head;
    }

    @JsonProperty("nodes")
    public Map<String, DoublyLinkedListNodeValue> getNodes() {
        return nodes;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof DoublyLinkedListValue && equalTo((DoublyLinkedListValue) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(DoublyLinkedListValue other) {
        return head.equals(other.head) && nodes.equals(other.nodes);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.head, this.nodes);
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
        private Optional<String> head = Optional.empty();

        private Map<String, DoublyLinkedListNodeValue> nodes = new LinkedHashMap<>();

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        public Builder from(DoublyLinkedListValue other) {
            head(other.getHead());
            nodes(other.getNodes());
            return this;
        }

        @JsonSetter(value = "head", nulls = Nulls.SKIP)
        public Builder head(Optional<String> head) {
            this.head = head;
            return this;
        }

        public Builder head(String head) {
            this.head = Optional.ofNullable(head);
            return this;
        }

        @JsonSetter(value = "nodes", nulls = Nulls.SKIP)
        public Builder nodes(Map<String, DoublyLinkedListNodeValue> nodes) {
            this.nodes.clear();
            this.nodes.putAll(nodes);
            return this;
        }

        public Builder putAllNodes(Map<String, DoublyLinkedListNodeValue> nodes) {
            this.nodes.putAll(nodes);
            return this;
        }

        public Builder nodes(String key, DoublyLinkedListNodeValue value) {
            this.nodes.put(key, value);
            return this;
        }

        public DoublyLinkedListValue build() {
            return new DoublyLinkedListValue(head, nodes, additionalProperties);
        }
    }
}
