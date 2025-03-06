package com.rapiddocs.java.output;

import com.rapiddocs.generator.exec.model.logging.MavenCoordinate;
import com.rapiddocs.java.output.gradle.AbstractGradleDependency;
import com.rapiddocs.java.output.gradle.GradleDependencyType;
import com.rapiddocs.java.output.gradle.GradlePlugin;
import com.rapiddocs.java.output.gradle.GradlePublishingConfig;
import com.rapiddocs.java.output.gradle.GradleRepository;
import com.rapiddocs.java.output.gradle.ParsedGradleDependency;
import com.rapiddocs.java.output.gradle.RootProjectGradleDependency;
import java.util.List;
import org.junit.jupiter.api.Test;

public class GeneratedBuildGradleTest {

    @Test
    public void test_generatedBuildGradle() {
        MavenCoordinate mavenCoordinate = MavenCoordinate.builder()
                .group("io.github.khulnasoft")
                .artifact("rapiddocs")
                .version("0.0.0")
                .build();
        List<AbstractGradleDependency> deps = List.of(
                ParsedGradleDependency.builder()
                        .type(GradleDependencyType.IMPLEMENTATION)
                        .group("io.github.khulnasoft")
                        .artifact("jersy-utils")
                        .version(ParsedGradleDependency.UTILS_VERSION)
                        .build(),
                RootProjectGradleDependency.INSTANCE);
        GeneratedBuildGradle buildGradle = GeneratedBuildGradle.builder()
                .addAllPlugins(List.of(
                        GradlePlugin.builder()
                                .pluginId(GeneratedBuildGradle.JAVA_LIBRARY_PLUGIN_ID)
                                .build(),
                        GradlePlugin.builder()
                                .pluginId(GeneratedBuildGradle.MAVEN_PUBLISH_PLUGIN_ID)
                                .build()))
                .addCustomRepositories(GradleRepository.builder()
                        .url("https://s01.oss.sonatype.org/content/repositories/releases/")
                        .build())
                .gradlePublishingConfig(GradlePublishingConfig.builder()
                        .version(mavenCoordinate.getVersion())
                        .group(mavenCoordinate.getGroup())
                        .artifact(mavenCoordinate.getArtifact())
                        .build())
                .addAllDependencies(deps)
                .shouldSignPackage(false)
                .addCustomBlocks("java {\n" + "    withSourcesJar()\n" + "    withJavadocJar()\n" + "}\n")
                .build();

        System.out.println(buildGradle.getContents());
    }
}
