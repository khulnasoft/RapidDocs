package com.rapiddocs.java.generators.tests;

import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.generators.AbstractFileGenerator;
import com.rapiddocs.java.output.GeneratedFile;
import com.rapiddocs.java.output.GeneratedResourcesJavaFile;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class QueryStringMapperTestGenerator extends AbstractFileGenerator {

    public QueryStringMapperTestGenerator(AbstractGeneratorContext<?, ?> generatorContext) {
        super(generatorContext.getPoetClassNameFactory().getQueryStringMapperTestClassName(), generatorContext);
    }

    @Override
    public GeneratedFile generateFile() {
        try (InputStream is = QueryStringMapperTestGenerator.class.getResourceAsStream(
                "/tests/QueryStringMapperTest.Template.java")) {
            String contents = new String(is.readAllBytes(), StandardCharsets.UTF_8)
                    .replaceAll(
                            "<%= coreNamespace%>",
                            generatorContext.getPoetClassNameFactory().getCorePackage());
            return GeneratedResourcesJavaFile.builder()
                    .className(className)
                    .contents(contents)
                    .testFile(true)
                    .build();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read QueryStringMapperTest.Template.java");
        }
    }
}
