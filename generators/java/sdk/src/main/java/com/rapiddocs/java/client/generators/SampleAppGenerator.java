package com.rapiddocs.java.client.generators;

import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.client.GeneratedRootClient;
import com.rapiddocs.java.generators.AbstractFilesGenerator;
import com.rapiddocs.java.output.GeneratedBuildGradle;
import com.rapiddocs.java.output.GeneratedFile;
import com.rapiddocs.java.output.GeneratedJavaFile;
import com.rapiddocs.java.output.gradle.GradlePlugin;
import com.rapiddocs.java.output.gradle.GradleRepository;
import com.rapiddocs.java.output.gradle.RootProjectGradleDependency;
import com.squareup.javapoet.ArrayTypeName;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.MethodSpec;
import com.squareup.javapoet.TypeSpec;
import java.util.List;
import javax.lang.model.element.Modifier;

public final class SampleAppGenerator extends AbstractFilesGenerator {

    private final GeneratedRootClient generatedClientWrapper;

    public static final String SAMPLE_APP_DIRECTORY = "sample-app";

    public SampleAppGenerator(
            AbstractGeneratorContext<?, ?> generatorContext, GeneratedRootClient generatedClientWrapper) {
        super(generatorContext);
        this.generatedClientWrapper = generatedClientWrapper;
    }

    @Override
    public List<GeneratedFile> generateFiles() {
        GeneratedBuildGradle buildGradle = GeneratedBuildGradle.builder()
                .directoryPrefix(SAMPLE_APP_DIRECTORY)
                .addPlugins(GradlePlugin.builder()
                        .pluginId(GeneratedBuildGradle.JAVA_LIBRARY_PLUGIN_ID)
                        .build())
                .addCustomRepositories(GradleRepository.builder()
                        .url("https://s01.oss.sonatype.org/content/repositories/releases/")
                        .build())
                .addDependencies()
                .addDependencies(RootProjectGradleDependency.INSTANCE)
                .shouldSignPackage(false)
                .build();
        TypeSpec appTypeSpec = TypeSpec.classBuilder("App")
                .addModifiers(Modifier.PUBLIC, Modifier.FINAL)
                .addMethod(MethodSpec.methodBuilder("main")
                        .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                        .addParameter(ArrayTypeName.of(ClassName.get(String.class)), "args")
                        .addComment("import "
                                + generatedClientWrapper.getClassName().toString())
                        .build())
                .build();
        ClassName appClassName = ClassName.get("sample", appTypeSpec.name);
        GeneratedJavaFile appJava = GeneratedJavaFile.builder()
                .className(appClassName)
                .javaFile(JavaFile.builder(appClassName.packageName(), appTypeSpec)
                        .build())
                .directoryPrefix(SAMPLE_APP_DIRECTORY)
                .build();
        return List.of(buildGradle, appJava);
    }
}
