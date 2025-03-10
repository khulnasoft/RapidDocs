package com.rapiddocs.java.generators;

import com.rapiddocs.ir.model.auth.ApiAuth;
import com.rapiddocs.ir.model.auth.AuthScheme;
import com.rapiddocs.ir.model.auth.AuthSchemesRequirement;
import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.generators.auth.AuthSchemeGenerator;
import com.rapiddocs.java.output.GeneratedAuthFiles;
import com.rapiddocs.java.output.GeneratedJavaFile;
import java.util.List;
import java.util.Optional;

public final class AuthGenerator {

    private final ApiAuth apiAuth;
    private final AbstractGeneratorContext<?, ?> generatorContext;

    public AuthGenerator(AbstractGeneratorContext<?, ?> generatorContext) {
        this.apiAuth = generatorContext.getIr().getAuth();
        this.generatorContext = generatorContext;
    }

    public Optional<GeneratedAuthFiles> generate() {
        List<AuthScheme> schemes = generatorContext.getResolvedAuthSchemes();
        if (schemes.isEmpty()) {
            return Optional.empty();
        } else if (schemes.size() == 1) {
            AuthScheme authScheme = schemes.get(0);
            GeneratedJavaFile generatedFile = authScheme.visit(new AuthSchemeGenerator(generatorContext));
            return Optional.of(GeneratedAuthFiles.builder()
                    .className(generatedFile.getClassName())
                    .javaFile(generatedFile.javaFile())
                    .authScheme(authScheme)
                    .build());
        } else if (apiAuth.getRequirement().equals(AuthSchemesRequirement.ANY)) {
            throw new RuntimeException("Any auth is unsupported!");
        } else if (apiAuth.getRequirement().equals(AuthSchemesRequirement.ALL)) {
            throw new RuntimeException("All auth is unsupported!");
        }
        throw new RuntimeException("Encountered unknown apiAuth: " + apiAuth);
    }
}
