package com.rapiddocs.java.generators;

import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.output.GeneratedFile;
import com.squareup.javapoet.ClassName;
import java.util.Collections;
import java.util.List;

public abstract class AbstractFileGenerator extends AbstractFilesGenerator {

    @SuppressWarnings("checkstyle:VisibilityModifier")
    protected ClassName className;

    public AbstractFileGenerator(ClassName className, AbstractGeneratorContext<?, ?> generatorContext) {
        super(generatorContext);
        this.className = className;
    }

    public abstract GeneratedFile generateFile();

    @Override
    public final List<GeneratedFile> generateFiles() {
        return Collections.singletonList(generateFile());
    }
}
