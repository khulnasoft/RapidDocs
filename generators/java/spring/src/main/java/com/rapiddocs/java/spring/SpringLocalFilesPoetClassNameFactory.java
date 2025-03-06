package com.rapiddocs.java.spring;

import com.rapiddocs.ir.model.commons.RapiddocsFilepath;
import com.rapiddocs.ir.model.errors.DeclaredErrorName;
import com.rapiddocs.ir.model.http.HttpService;
import com.rapiddocs.ir.model.http.InlinedRequestBody;
import com.rapiddocs.java.AbstractNonModelPoetClassNameFactory;
import com.rapiddocs.java.ICustomConfig;
import com.squareup.javapoet.ClassName;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public final class SpringLocalFilesPoetClassNameFactory extends AbstractNonModelPoetClassNameFactory {

    public SpringLocalFilesPoetClassNameFactory(
            Optional<String> directoryNamePrefix, ICustomConfig.PackageLayout packageLayout) {
        super(directoryNamePrefix.map(List::of).orElseGet(() -> Collections.emptyList()), packageLayout);
    }

    public ClassName getErrorControllerAdviceName(DeclaredErrorName declaredTypeName) {
        String packageName =
                getResourcesPackage(Optional.of(declaredTypeName.getRapiddocsFilepath()), Optional.of("handlers"));
        return ClassName.get(
                packageName, declaredTypeName.getName().getPascalCase().getUnsafeName() + "ExceptionHandler");
    }

    public ClassName getErrorClassName(DeclaredErrorName declaredTypeName) {
        String packageName =
                getResourcesPackage(Optional.of(declaredTypeName.getRapiddocsFilepath()), Optional.of("exceptions"));
        return ClassName.get(
                packageName, declaredTypeName.getName().getPascalCase().getSafeName());
    }

    public ClassName getServiceInterfaceClassName(HttpService httpService) {
        String packageName =
                getResourcesPackage(Optional.of(httpService.getName().getRapiddocsFilepath()), Optional.empty());
        return ClassName.get(packageName, getServiceName(httpService.getName().getRapiddocsFilepath()));
    }

    public ClassName getInlinedRequestBodyClassName(HttpService httpService, InlinedRequestBody inlinedRequestBody) {
        String packageName =
                getResourcesPackage(Optional.of(httpService.getName().getRapiddocsFilepath()), Optional.of("requests"));
        return ClassName.get(
                packageName, inlinedRequestBody.getName().getPascalCase().getSafeName());
    }

    private static String getServiceName(RapiddocsFilepath rapiddocsFilepath) {
        if (rapiddocsFilepath.getAllParts().isEmpty()) {
            return "RootService";
        }
        return rapiddocsFilepath
                        .getAllParts()
                        .get(rapiddocsFilepath.getAllParts().size() - 1)
                        .getPascalCase()
                        .getUnsafeName() + "Service";
    }
}
