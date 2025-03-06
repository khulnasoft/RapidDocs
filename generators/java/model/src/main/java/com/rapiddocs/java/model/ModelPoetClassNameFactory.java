package com.rapiddocs.java.model;

import com.rapiddocs.ir.model.ir.IntermediateRepresentation;
import com.rapiddocs.java.AbstractModelPoetClassNameFactory;
import com.rapiddocs.java.AbstractPoetClassNameFactory;
import com.rapiddocs.java.ICustomConfig;

public final class ModelPoetClassNameFactory extends AbstractModelPoetClassNameFactory {

    public ModelPoetClassNameFactory(
            IntermediateRepresentation ir, String organization, ICustomConfig.PackageLayout packageLayout) {
        super(AbstractPoetClassNameFactory.getPackagePrefixWithOrgAndApiName(ir, organization), packageLayout);
    }
}
