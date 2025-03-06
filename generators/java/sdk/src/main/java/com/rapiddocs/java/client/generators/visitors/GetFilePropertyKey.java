package com.rapiddocs.java.client.generators.visitors;

import com.rapiddocs.ir.model.commons.NameAndWireValue;
import com.rapiddocs.ir.model.http.FileProperty;
import com.rapiddocs.ir.model.http.FilePropertyArray;
import com.rapiddocs.ir.model.http.FilePropertySingle;

public class GetFilePropertyKey implements FileProperty.Visitor<NameAndWireValue> {

    @Override
    public NameAndWireValue visitFile(FilePropertySingle file) {
        return file.getKey();
    }

    @Override
    public NameAndWireValue visitFileArray(FilePropertyArray fileArray) {
        return fileArray.getKey();
    }

    @Override
    public NameAndWireValue _visitUnknown(Object unknownType) {
        throw new RuntimeException("Encountered unknown file property key " + unknownType);
    }
}
