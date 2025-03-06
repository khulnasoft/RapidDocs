package com.rapiddocs.java.utils;

import com.rapiddocs.ir.model.commons.TypeId;
import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
public interface NamedTypeId {
    String name();

    TypeId typeId();

    static ImmutableNamedTypeId.NameBuildStage builder() {
        return ImmutableNamedTypeId.builder();
    }
}
