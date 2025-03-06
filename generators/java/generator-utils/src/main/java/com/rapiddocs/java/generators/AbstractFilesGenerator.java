package com.rapiddocs.java.generators;

import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.output.GeneratedFile;
import java.util.List;

public abstract class AbstractFilesGenerator {

    @SuppressWarnings("checkstyle:VisibilityModifier")
    protected AbstractGeneratorContext<?, ?> generatorContext;

    public AbstractFilesGenerator(AbstractGeneratorContext<?, ?> generatorContext) {
        this.generatorContext = generatorContext;
    }

    public abstract List<GeneratedFile> generateFiles();
}
