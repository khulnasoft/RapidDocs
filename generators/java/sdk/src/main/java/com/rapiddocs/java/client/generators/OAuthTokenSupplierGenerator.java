package com.rapiddocs.java.client.generators;

import com.rapiddocs.ir.model.auth.OAuthAccessTokenRequestProperties;
import com.rapiddocs.ir.model.auth.OAuthClientCredentials;
import com.rapiddocs.ir.model.commons.EndpointId;
import com.rapiddocs.ir.model.commons.EndpointReference;
import com.rapiddocs.ir.model.http.HttpEndpoint;
import com.rapiddocs.ir.model.http.HttpResponseBody;
import com.rapiddocs.ir.model.http.HttpService;
import com.rapiddocs.ir.model.http.JsonResponseBody;
import com.rapiddocs.ir.model.http.ResponseProperty;
import com.rapiddocs.ir.model.http.SdkRequestBodyType;
import com.rapiddocs.ir.model.http.SdkRequestShape.Visitor;
import com.rapiddocs.ir.model.http.SdkRequestWrapper;
import com.rapiddocs.ir.model.ir.Subpackage;
import com.rapiddocs.ir.model.types.TypeReference;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.client.generators.visitors.RequestPropertyToNameVisitor;
import com.rapiddocs.java.generators.AbstractFileGenerator;
import com.rapiddocs.java.output.GeneratedJavaFile;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.CodeBlock;
import com.squareup.javapoet.FieldSpec;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.MethodSpec;
import com.squareup.javapoet.ParameterizedTypeName;
import com.squareup.javapoet.TypeName;
import com.squareup.javapoet.TypeSpec;
import com.squareup.javapoet.TypeSpec.Builder;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.function.Supplier;
import javax.lang.model.element.Modifier;

public class OAuthTokenSupplierGenerator extends AbstractFileGenerator {

    private static final String CLIENT_ID_FIELD_NAME = "clientId";
    private static final String CLIENT_SECRET_FIELD_NAME = "clientSecret";
    private static final String ACCESS_TOKEN_FIELD_NAME = "accessToken";
    private static final String AUTH_CLIENT_NAME = "authClient";
    private static final String GET_TOKEN_REQUEST_NAME = "getTokenRequest";
    private static final String EXPIRES_AT_FIELD_NAME = "expiresAt";
    private static final String BUFFER_IN_MINUTES_CONSTANT_NAME = "BUFFER_IN_MINUTES";
    private static final String EXPIRES_IN_SECONDS_PARAMETER_NAME = "expiresInSeconds";

    private static final String FETCH_TOKEN_METHOD_NAME = "fetchToken";
    private static final String GET_METHOD_NAME = "get";
    private static final String GET_EXPIRES_AT_METHOD_NAME = "getExpiresAt";

    private final OAuthClientCredentials clientCredentials;
    private final ClientGeneratorContext clientGeneratorContext;

    public OAuthTokenSupplierGenerator(
            ClientGeneratorContext clientGeneratorContext, OAuthClientCredentials clientCredentials) {
        super(
                clientGeneratorContext.getPoetClassNameFactory().getCoreClassName("OAuthTokenSupplier"),
                clientGeneratorContext);
        this.clientCredentials = clientCredentials;
        this.clientGeneratorContext = clientGeneratorContext;
    }

    @Override
    public GeneratedJavaFile generateFile() {
        validateSupportedConfiguration(clientCredentials);
        EndpointReference tokenEndpointReference =
                clientCredentials.getTokenEndpoint().getEndpointReference();
        HttpService httpService = generatorContext.getIr().getServices().get(tokenEndpointReference.getServiceId());
        EndpointId endpointId = tokenEndpointReference.getEndpointId();
        HttpEndpoint httpEndpoint = httpService.getEndpoints().stream()
                .filter(it -> it.getId().equals(endpointId))
                .findFirst()
                .orElseThrow();
        Subpackage subpackage = generatorContext
                .getIr()
                .getSubpackages()
                .get(tokenEndpointReference.getSubpackageId().get());
        ClassName authClientClassName =
                clientGeneratorContext.getPoetClassNameFactory().getClientClassName(subpackage);
        OAuthAccessTokenRequestProperties requestProperties =
                clientCredentials.getTokenEndpoint().getRequestProperties();
        String clientIdPropertyName = requestProperties
                .getClientId()
                .getProperty()
                .visit(new RequestPropertyToNameVisitor())
                .getName()
                .getCamelCase()
                .getUnsafeName();
        String clientSecretPropertyName = requestProperties
                .getClientSecret()
                .getProperty()
                .visit(new RequestPropertyToNameVisitor())
                .getName()
                .getCamelCase()
                .getUnsafeName();
        TypeName fetchTokenRequestType = getFetchTokenRequestType(httpEndpoint, httpService);
        // todo: handle other response types
        HttpResponseBody tokenHttpResponseBody =
                httpEndpoint.getResponse().get().getBody().get();
        JsonResponseBody jsonResponseBody = tokenHttpResponseBody
                .getJson()
                .orElseThrow(() -> new RuntimeException("Unexpected non json response type for token endpoint"))
                .getResponse()
                .get();
        TypeName fetchTokenReturnType = clientGeneratorContext
                .getPoetTypeNameMapper()
                .convertToTypeName(true, jsonResponseBody.getResponseBodyType());
        String accessTokenResponsePropertyName = clientCredentials
                .getTokenEndpoint()
                .getResponseProperties()
                .getAccessToken()
                .getProperty()
                .getName()
                .getName()
                .getPascalCase()
                .getUnsafeName();
        ParameterizedTypeName supplierOfString =
                ParameterizedTypeName.get(ClassName.get(Supplier.class), ClassName.get(String.class));
        Optional<ResponseProperty> expiryResponseProperty =
                clientCredentials.getTokenEndpoint().getResponseProperties().getExpiresIn();
        boolean refreshRequired = expiryResponseProperty.isPresent();
        MethodSpec.Builder getMethodSpecBuilder = MethodSpec.methodBuilder(GET_METHOD_NAME)
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(ClassName.get("", "java.lang.Override"))
                .returns(String.class)
                .beginControlFlow(
                        refreshRequired
                                ? CodeBlock.builder()
                                        .add(
                                                "if ($L == null || $L.isBefore($T.now()))",
                                                ACCESS_TOKEN_FIELD_NAME,
                                                EXPIRES_AT_FIELD_NAME,
                                                Instant.class)
                                        .build()
                                : CodeBlock.builder()
                                        .add("if ($L == null)", ACCESS_TOKEN_FIELD_NAME)
                                        .build())
                .addStatement("$T authResponse = $L()", fetchTokenReturnType, FETCH_TOKEN_METHOD_NAME)
                .addStatement(
                        "this.$L = authResponse.get$L()", ACCESS_TOKEN_FIELD_NAME, accessTokenResponsePropertyName);
        if (refreshRequired) {
            String tokenPropertyName = expiryResponseProperty
                    .get()
                    .getProperty()
                    .getName()
                    .getName()
                    .getPascalCase()
                    .getUnsafeName();
            getMethodSpecBuilder.addStatement(
                    "this.$L = $L(authResponse.get$L())",
                    EXPIRES_AT_FIELD_NAME,
                    GET_EXPIRES_AT_METHOD_NAME,
                    tokenPropertyName);
        }
        getMethodSpecBuilder
                .endControlFlow()
                .addStatement(
                        "return $S + $L",
                        clientCredentials.getTokenPrefix().orElse("Bearer") + " ",
                        ACCESS_TOKEN_FIELD_NAME);
        MethodSpec.Builder constructorBuilder = MethodSpec.constructorBuilder()
                .addModifiers(Modifier.PUBLIC)
                .addParameter(String.class, CLIENT_ID_FIELD_NAME)
                .addParameter(String.class, CLIENT_SECRET_FIELD_NAME)
                .addParameter(authClientClassName, AUTH_CLIENT_NAME)
                .addStatement("this.$L = $L", CLIENT_ID_FIELD_NAME, CLIENT_ID_FIELD_NAME)
                .addStatement("this.$L = $L", CLIENT_SECRET_FIELD_NAME, CLIENT_SECRET_FIELD_NAME)
                .addStatement("this.$L = $L", AUTH_CLIENT_NAME, AUTH_CLIENT_NAME);
        if (refreshRequired) {
            constructorBuilder.addStatement("this.$L = $T.now()", EXPIRES_AT_FIELD_NAME, Instant.class);
        }
        Builder oauthTypeSpecBuilder = TypeSpec.classBuilder(className)
                .addSuperinterface(supplierOfString)
                .addModifiers(Modifier.PUBLIC, Modifier.FINAL)
                .addField(FieldSpec.builder(String.class, CLIENT_ID_FIELD_NAME, Modifier.PRIVATE, Modifier.FINAL)
                        .build())
                .addField(FieldSpec.builder(String.class, CLIENT_SECRET_FIELD_NAME, Modifier.PRIVATE, Modifier.FINAL)
                        .build())
                .addField(FieldSpec.builder(authClientClassName, AUTH_CLIENT_NAME, Modifier.PRIVATE, Modifier.FINAL)
                        .build())
                .addField(FieldSpec.builder(String.class, ACCESS_TOKEN_FIELD_NAME, Modifier.PRIVATE)
                        .build())
                .addMethod(constructorBuilder.build())
                .addMethod(MethodSpec.methodBuilder(FETCH_TOKEN_METHOD_NAME)
                        .addModifiers(Modifier.PUBLIC)
                        .returns(fetchTokenReturnType)
                        .addStatement(
                                "$T $L = $T.builder().$L($L).$L($L).build()",
                                fetchTokenRequestType,
                                GET_TOKEN_REQUEST_NAME,
                                fetchTokenRequestType,
                                clientIdPropertyName,
                                CLIENT_ID_FIELD_NAME,
                                clientSecretPropertyName,
                                CLIENT_SECRET_FIELD_NAME)
                        .addStatement(
                                "return $L.$L($L)",
                                AUTH_CLIENT_NAME,
                                httpEndpoint.getName().get().getCamelCase().getUnsafeName(),
                                GET_TOKEN_REQUEST_NAME)
                        .build())
                .addMethod(getMethodSpecBuilder.build());
        if (refreshRequired) {
            oauthTypeSpecBuilder
                    .addField(FieldSpec.builder(Instant.class, EXPIRES_AT_FIELD_NAME, Modifier.PRIVATE)
                            .build())
                    .addField(FieldSpec.builder(
                                    long.class,
                                    BUFFER_IN_MINUTES_CONSTANT_NAME,
                                    Modifier.PRIVATE,
                                    Modifier.STATIC,
                                    Modifier.FINAL)
                            .initializer("2")
                            .build())
                    .addMethod(MethodSpec.methodBuilder(GET_EXPIRES_AT_METHOD_NAME)
                            .addModifiers(Modifier.PRIVATE)
                            .returns(Instant.class)
                            .addParameter(long.class, EXPIRES_IN_SECONDS_PARAMETER_NAME)
                            .addStatement(
                                    "return $T.now().plus($L, $T.SECONDS).minus($L, $T.MINUTES)",
                                    Instant.class,
                                    EXPIRES_IN_SECONDS_PARAMETER_NAME,
                                    ChronoUnit.class,
                                    BUFFER_IN_MINUTES_CONSTANT_NAME,
                                    ChronoUnit.class)
                            .build());
        }
        JavaFile authHeaderFile = JavaFile.builder(className.packageName(), oauthTypeSpecBuilder.build())
                .build();
        return GeneratedJavaFile.builder()
                .className(className)
                .javaFile(authHeaderFile)
                .build();
    }

    private static void validateSupportedConfiguration(OAuthClientCredentials clientCredentials) {
        if (clientCredentials.getRefreshEndpoint().isPresent())
            throw new RuntimeException("Refresh endpoints not supported");
        if (clientCredentials.getScopes().isPresent()
                && !clientCredentials.getScopes().get().isEmpty()) throw new RuntimeException("Scopes not supported");
    }

    private TypeName getFetchTokenRequestType(HttpEndpoint httpEndpoint, HttpService httpService) {
        return httpEndpoint.getSdkRequest().get().getShape().visit(new Visitor<>() {
            @Override
            public TypeName visitJustRequestBody(SdkRequestBodyType justRequestBody) {
                TypeReference requestBodyType =
                        justRequestBody.getTypeReference().get().getRequestBodyType();
                return clientGeneratorContext.getPoetTypeNameMapper().convertToTypeName(true, requestBodyType);
            }

            @Override
            public TypeName visitWrapper(SdkRequestWrapper wrapper) {
                return clientGeneratorContext
                        .getPoetClassNameFactory()
                        .getRequestWrapperBodyClassName(httpService, wrapper);
            }

            @Override
            public TypeName _visitUnknown(Object unknownType) {
                throw new RuntimeException("Unknown SdkRequestShape: " + unknownType);
            }
        });
    }
}
