package com.rapiddocs.java.client;

import com.rapiddocs.ir.model.commons.RapiddocsFilepath;
import com.rapiddocs.ir.model.errors.ErrorDeclaration;
import com.rapiddocs.ir.model.http.HttpService;
import com.rapiddocs.ir.model.http.SdkRequestWrapper;
import com.rapiddocs.ir.model.ir.Subpackage;
import com.rapiddocs.java.AbstractNonModelPoetClassNameFactory;
import com.rapiddocs.java.ICustomConfig;
import com.rapiddocs.java.utils.CasingUtils;
import com.squareup.javapoet.ClassName;
import java.util.List;
import java.util.Optional;

public final class ClientPoetClassNameFactory extends AbstractNonModelPoetClassNameFactory {

    public ClientPoetClassNameFactory(List<String> packagePrefixTokens, ICustomConfig.PackageLayout packageLayout) {
        super(packagePrefixTokens, packageLayout);
    }

    public ClassName getErrorClassName(ErrorDeclaration errorDeclaration) {
        String packageName = getErrorsPackageName(errorDeclaration.getName().getRapiddocsFilepath());
        return ClassName.get(
                packageName,
                errorDeclaration.getName().getName().getPascalCase().getSafeName());
    }

    public ClassName getInputStreamRequestBodyClassName() {
        return ClassName.get(getCorePackage(), "InputStreamRequestBody");
    }

    public ClassName getFileStreamClassName() {
        return ClassName.get(getCorePackage(), "FileStream");
    }

    public ClassName getRetryInterceptorClassName() {
        return ClassName.get(getCorePackage(), "RetryInterceptor");
    }

    public ClassName getResponseBodyInputStreamClassName() {
        return ClassName.get(getCorePackage(), "ResponseBodyInputStream");
    }

    public ClassName getResponseBodyReaderClassName() {
        return ClassName.get(getCorePackage(), "ResponseBodyReader");
    }

    public ClassName getApiVersionClassName() {
        return ClassName.get(getCorePackage(), "ApiVersion");
    }

    public ClassName getRequestOptionsClassName() {
        return ClassName.get(getCorePackage(), "RequestOptions");
    }

    public ClassName getIdempotentRequestOptionsClassName() {
        return ClassName.get(getCorePackage(), "IdempotentRequestOptions");
    }

    public ClassName getMediaTypesClassName() {
        return ClassName.get(getCorePackage(), "MediaTypes");
    }

    public ClassName getClientClassName(Subpackage subpackage) {
        String packageName = getResourcesPackage(Optional.of(subpackage.getRapiddocsFilepath()), Optional.empty());
        return ClassName.get(packageName, getClientName(subpackage.getRapiddocsFilepath()));
    }

    public ClassName getRequestWrapperBodyClassName(HttpService httpService, SdkRequestWrapper sdkRequestWrapper) {
        String packageName;
        switch (packageLayout) {
            case FLAT:
                packageName =
                        getResourcesPackage(Optional.of(httpService.getName().getRapiddocsFilepath()), Optional.empty());
                break;
            case NESTED:
            default:
                packageName = getResourcesPackage(
                        Optional.of(httpService.getName().getRapiddocsFilepath()), Optional.of("requests"));
        }
        return ClassName.get(
                packageName, sdkRequestWrapper.getWrapperName().getPascalCase().getSafeName());
    }

    public ClassName getApiErrorClassName(String organization, String workspaceName, JavaSdkCustomConfig customConfig) {
        String name = customConfig
                .baseApiExceptionClassName()
                .orElseGet(() ->
                        customConfig.clientClassName().orElseGet(() -> getBaseNamePrefix(organization, workspaceName))
                                + "ApiException");
        return getCoreClassName(name);
    }

    public ClassName getBaseExceptionClassName(
            String organization, String workspaceName, JavaSdkCustomConfig customConfig) {
        String name = customConfig
                .baseExceptionClassName()
                .orElseGet(() ->
                        customConfig.clientClassName().orElseGet(() -> getBaseNamePrefix(organization, workspaceName))
                                + "Exception");
        return getCoreClassName(name);
    }

    public static String getBaseNamePrefix(String organization, String workspaceName) {
        return CasingUtils.convertKebabCaseToUpperCamelCase(organization)
                + CasingUtils.convertKebabCaseToUpperCamelCase(workspaceName);
    }

    private static String getClientName(RapiddocsFilepath rapiddocsFilepath) {
        return rapiddocsFilepath
                        .getAllParts()
                        .get(rapiddocsFilepath.getAllParts().size() - 1)
                        .getPascalCase()
                        .getUnsafeName() + "Client";
    }
}
