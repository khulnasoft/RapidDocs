/*
 * (c) Copyright 2023 Birch Solutions Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.rapiddocs.java.spring;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.rapiddocs.java.ICustomConfig;
import com.rapiddocs.java.IDownloadFilesCustomConfig;
import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
@JsonDeserialize(as = ImmutableSpringCustomConfig.class)
public interface SpringCustomConfig extends ICustomConfig, IDownloadFilesCustomConfig {

    @Value.Default
    @JsonProperty("SpringCustomConfig")
    @Override
    default Boolean wrappedAliases() {
        return true;
    }

    @Value.Default
    @JsonProperty("package-layout")
    @Override
    default PackageLayout packageLayout() {
        return PackageLayout.NESTED;
    }

    static ImmutableSpringCustomConfig.Builder builder() {
        return ImmutableSpringCustomConfig.builder();
    }
}
