package com.rapiddocs.java.client.generators.visitors;

import com.rapiddocs.ir.model.http.FileProperty;
import com.rapiddocs.ir.model.http.FilePropertyArray;
import com.rapiddocs.ir.model.http.FilePropertySingle;

public class FilePropertyIsOptional implements FileProperty.Visitor<Boolean> {

    @Override
    public Boolean visitFile(FilePropertySingle file) {
        return file.getIsOptional();
    }

    @Override
    public Boolean visitFileArray(FilePropertyArray fileArray) {
        return fileArray.getIsOptional();
    }

    @Override
    public Boolean _visitUnknown(Object unknownType) {
        return false;
    }
}
