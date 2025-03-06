package com.rapiddocs.java.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.rapiddocs.generator.exec.model.config.GeneratorConfig;
import com.rapiddocs.generator.exec.model.config.GeneratorPublishConfig;
import com.rapiddocs.generator.exec.model.config.GithubOutputMode;
import com.rapiddocs.ir.core.ObjectMappers;
import com.rapiddocs.ir.model.ir.IntermediateRepresentation;
import com.rapiddocs.java.AbstractGeneratorCli;
import com.rapiddocs.java.CustomConfig;
import com.rapiddocs.java.DefaultGeneratorExecClient;
import com.rapiddocs.java.DownloadFilesCustomConfig;
import com.rapiddocs.java.generators.DateTimeDeserializerGenerator;
import com.rapiddocs.java.generators.ObjectMappersGenerator;
import com.rapiddocs.java.generators.TypesGenerator;
import com.rapiddocs.java.generators.TypesGenerator.Result;
import com.rapiddocs.java.output.gradle.AbstractGradleDependency;
import com.rapiddocs.java.output.gradle.GradleDependencyType;
import com.rapiddocs.java.output.gradle.ParsedGradleDependency;
import java.util.Collections;
import java.util.List;

public final class Cli extends AbstractGeneratorCli<CustomConfig, DownloadFilesCustomConfig> {

    @Override
    public void runInDownloadFilesModeHook(
            DefaultGeneratorExecClient generatorExecClient,
            GeneratorConfig generatorConfig,
            IntermediateRepresentation ir,
            DownloadFilesCustomConfig customConfig) {
        throw new RuntimeException("Download files mode is unsupported!");
    }

    @Override
    public void runInGithubModeHook(
            DefaultGeneratorExecClient generatorExecClient,
            GeneratorConfig generatorConfig,
            IntermediateRepresentation ir,
            CustomConfig customConfig,
            GithubOutputMode githubOutputMode) {
        generateTypes(generatorConfig, ir, customConfig);
    }

    @Override
    public void runInPublishModeHook(
            DefaultGeneratorExecClient generatorExecClient,
            GeneratorConfig generatorConfig,
            IntermediateRepresentation ir,
            CustomConfig customConfig,
            GeneratorPublishConfig publishOutputMode) {
        generateTypes(generatorConfig, ir, customConfig);
    }

    private void generateTypes(
            GeneratorConfig generatorConfig, IntermediateRepresentation ir, CustomConfig customConfig) {
        ModelGeneratorContext context = new ModelGeneratorContext(ir, generatorConfig, customConfig);

        // core
        ObjectMappersGenerator objectMappersGenerator = new ObjectMappersGenerator(context);
        this.addGeneratedFile(objectMappersGenerator.generateFile());

        DateTimeDeserializerGenerator dateTimeDeserializerGenerator = new DateTimeDeserializerGenerator(context);
        this.addGeneratedFile(dateTimeDeserializerGenerator.generateFile());

        // types
        TypesGenerator typesGenerator = new TypesGenerator(context);
        Result generatedTypes = typesGenerator.generateFiles();
        generatedTypes.getTypes().values().forEach(this::addGeneratedFile);
        generatedTypes.getInterfaces().values().forEach(this::addGeneratedFile);
    }

    @Override
    public List<AbstractGradleDependency> getBuildGradleDependencies() {
        return List.of(
                ParsedGradleDependency.builder()
                        .type(GradleDependencyType.API)
                        .group("com.fasterxml.jackson.core")
                        .artifact("jackson-databind")
                        .version(ParsedGradleDependency.JACKSON_DATABIND_VERSION)
                        .build(),
                ParsedGradleDependency.builder()
                        .type(GradleDependencyType.API)
                        .group("com.fasterxml.jackson.datatype")
                        .artifact("jackson-datatype-jdk8")
                        .version(ParsedGradleDependency.JACKSON_JDK8_VERSION)
                        .build(),
                ParsedGradleDependency.builder()
                        .type(GradleDependencyType.API)
                        .group("com.fasterxml.jackson.datatype")
                        .artifact("jackson-datatype-jsr310")
                        .version(ParsedGradleDependency.JACKSON_JDK8_VERSION)
                        .build());
    }

    @Override
    public List<String> getSubProjects() {
        return Collections.emptyList();
    }

    @Override
    public CustomConfig getCustomConfig(GeneratorConfig generatorConfig) {
        if (generatorConfig.getCustomConfig().isPresent()) {
            JsonNode node = ObjectMappers.JSON_MAPPER.valueToTree(
                    generatorConfig.getCustomConfig().get());
            return ObjectMappers.JSON_MAPPER.convertValue(node, CustomConfig.class);
        }
        return CustomConfig.builder().build();
    }

    @Override
    public DownloadFilesCustomConfig getDownloadFilesCustomConfig(GeneratorConfig generatorConfig) {
        if (generatorConfig.getCustomConfig().isPresent()) {
            JsonNode node = ObjectMappers.JSON_MAPPER.valueToTree(
                    generatorConfig.getCustomConfig().get());
            return ObjectMappers.JSON_MAPPER.convertValue(node, DownloadFilesCustomConfig.class);
        }
        return DownloadFilesCustomConfig.builder().build();
    }

    public static void main(String... args) {
        Cli cli = new Cli();
        cli.run(args);
    }
}
