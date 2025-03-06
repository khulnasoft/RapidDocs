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

package com.rapiddocs.java.output;

import com.rapiddocs.ir.model.types.ObjectProperty;
import com.rapiddocs.java.generators.object.EnrichedObjectProperty;
import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import java.util.List;
import java.util.Map;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
public abstract class GeneratedObject extends AbstractGeneratedJavaFile {

    public abstract Map<ObjectProperty, EnrichedObjectProperty> objectPropertyGetters();

    public abstract List<EnrichedObjectProperty> extendedObjectPropertyGetters();

    public static ImmutableGeneratedObject.ClassNameBuildStage builder() {
        return ImmutableGeneratedObject.builder();
    }
}
