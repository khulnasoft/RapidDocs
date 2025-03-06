package com.rapiddocs.java;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
@JsonDeserialize(as = ImmutableDownloadFilesCustomConfig.class)
public interface DownloadFilesCustomConfig extends IDownloadFilesCustomConfig {
    static ImmutableDownloadFilesCustomConfig.Builder builder() {
        return ImmutableDownloadFilesCustomConfig.builder();
    }
}
