import rapiddocs.ir.resources as ir_types


def declared_type_name_to_named_type(declared_type_name: ir_types.DeclaredTypeName) -> ir_types.NamedType:
    return ir_types.NamedType(
        type_id=declared_type_name.type_id,
        rapiddocs_filepath=declared_type_name.rapiddocs_filepath,
        name=declared_type_name.name,
    )
