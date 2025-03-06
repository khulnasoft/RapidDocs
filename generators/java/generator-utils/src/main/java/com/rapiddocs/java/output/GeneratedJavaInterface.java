package com.rapiddocs.java.output;

import com.rapiddocs.ir.model.types.DeclaredTypeName;
import com.rapiddocs.ir.model.types.ObjectProperty;
import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import com.squareup.javapoet.MethodSpec;
import java.util.List;
import java.util.Set;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
public abstract class GeneratedJavaInterface extends AbstractGeneratedJavaFile {

    public abstract List<PropertyMethodSpec> propertyMethodSpecs();

    public abstract Set<DeclaredTypeName> extendedInterfaces();

    @Value.Immutable
    @StagedBuilderImmutablesStyle
    public interface PropertyMethodSpec {
        ObjectProperty objectProperty();

        MethodSpec methodSpec();

        static ImmutablePropertyMethodSpec.ObjectPropertyBuildStage builder() {
            return ImmutablePropertyMethodSpec.builder();
        }
    }

    public static ImmutableGeneratedJavaInterface.ClassNameBuildStage builder() {
        return ImmutableGeneratedJavaInterface.builder();
    }
}
