package com.rapiddocs.java;

import com.rapiddocs.generator.exec.model.config.GeneratorConfig;
import com.rapiddocs.generator.exec.model.logging.GeneratorUpdate;
import com.rapiddocs.generator.exec.model.logging.LogLevel;
import com.rapiddocs.generator.exec.model.logging.LogUpdate;
import com.rapiddocs.ir.model.auth.AuthScheme;
import com.rapiddocs.ir.model.auth.BearerAuthScheme;
import com.rapiddocs.ir.model.auth.OAuthScheme;
import com.rapiddocs.ir.model.commons.Name;
import com.rapiddocs.ir.model.commons.SafeAndUnsafeString;
import com.rapiddocs.ir.model.ir.IntermediateRepresentation;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class FeatureResolver {

    public static final AuthScheme DEFAULT_BEARER_AUTH = AuthScheme.bearer(BearerAuthScheme.builder()
            .token(Name.builder()
                    .originalName("token")
                    .camelCase(SafeAndUnsafeString.builder()
                            .unsafeName("token")
                            .safeName("token")
                            .build())
                    .pascalCase(SafeAndUnsafeString.builder()
                            .unsafeName("Token")
                            .safeName("Token")
                            .build())
                    .snakeCase(SafeAndUnsafeString.builder()
                            .unsafeName("token")
                            .safeName("token")
                            .build())
                    .screamingSnakeCase(SafeAndUnsafeString.builder()
                            .unsafeName("TOKEN")
                            .safeName("TOKEN")
                            .build())
                    .build())
            .build());
    private final IntermediateRepresentation ir;
    private final GeneratorConfig generatorConfig;
    private final DefaultGeneratorExecClient generatorExecClient;

    public FeatureResolver(
            IntermediateRepresentation ir,
            GeneratorConfig generatorConfig,
            DefaultGeneratorExecClient generatorExecClient) {
        this.ir = ir;
        this.generatorConfig = generatorConfig;
        this.generatorExecClient = generatorExecClient;
    }

    /** Replace OAuth scheme with a bearer token scheme if the generator config doesn't allow OAuth. */
    public List<AuthScheme> getResolvedAuthSchemes() {
        List<AuthScheme> schemes = ir.getAuth().getSchemes();
        Optional<OAuthScheme> maybeOAuthScheme = schemes.stream()
                .map(AuthScheme::getOauth)
                .flatMap(Optional::stream)
                .findFirst();
        if (maybeOAuthScheme.isEmpty() || generatorConfig.getGenerateOauthClients()) return schemes;
        generatorExecClient.sendUpdate(GeneratorUpdate.log(LogUpdate.builder()
                .level(LogLevel.ERROR)
                .message("OAuth is not supported in your current Java SDK plan; falling back to bearer auth. Please"
                        + " reach out to the Rapiddocs team!")
                .build()));
        List<AuthScheme> resolvedSchemes = schemes.stream()
                .filter(authScheme -> !authScheme.isOauth() && !authScheme.isBearer())
                .collect(Collectors.toList());
        resolvedSchemes.add(DEFAULT_BEARER_AUTH);
        return resolvedSchemes;
    }
}
