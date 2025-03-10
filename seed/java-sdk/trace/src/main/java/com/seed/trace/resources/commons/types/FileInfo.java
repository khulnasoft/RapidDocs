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
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.trace.core.ObjectMappers;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import org.jetbrains.annotations.NotNull;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = FileInfo.Builder.class)
public final class FileInfo {
    private final String filename;

    private final String contents;

    private final Map<String, Object> additionalProperties;

    private FileInfo(String filename, String contents, Map<String, Object> additionalProperties) {
        this.filename = filename;
        this.contents = contents;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("filename")
    public String getFilename() {
        return filename;
    }

    @JsonProperty("contents")
    public String getContents() {
        return contents;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof FileInfo && equalTo((FileInfo) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(FileInfo other) {
        return filename.equals(other.filename) && contents.equals(other.contents);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.filename, this.contents);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static FilenameStage builder() {
        return new Builder();
    }

    public interface FilenameStage {
        ContentsStage filename(@NotNull String filename);

        Builder from(FileInfo other);
    }

    public interface ContentsStage {
        _FinalStage contents(@NotNull String contents);
    }

    public interface _FinalStage {
        FileInfo build();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder implements FilenameStage, ContentsStage, _FinalStage {
        private String filename;

        private String contents;

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        @java.lang.Override
        public Builder from(FileInfo other) {
            filename(other.getFilename());
            contents(other.getContents());
            return this;
        }

        @java.lang.Override
        @JsonSetter("filename")
        public ContentsStage filename(@NotNull String filename) {
            this.filename = Objects.requireNonNull(filename, "filename must not be null");
            return this;
        }

        @java.lang.Override
        @JsonSetter("contents")
        public _FinalStage contents(@NotNull String contents) {
            this.contents = Objects.requireNonNull(contents, "contents must not be null");
            return this;
        }

        @java.lang.Override
        public FileInfo build() {
            return new FileInfo(filename, contents, additionalProperties);
        }
    }
}
