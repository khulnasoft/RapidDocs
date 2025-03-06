package generator

import (
	"fmt"
	"sort"

	rapiddocsir "github.com/khulnasoft/rapiddocs-go/internal/rapiddocs/ir"
	"github.com/hmdsefi/gograph"
	"github.com/hmdsefi/gograph/connectivity"
)

// Package is used for readability for now.
type PackageName = string

// CycleInfo will eventually exist in the IR definition.
type CycleInfo struct {
	RecursiveTypes []rapiddocsir.TypeId
	LeafTypes      []rapiddocsir.TypeId
}

func cycleInfoFromIR(ir *rapiddocsir.IntermediateRepresentation, baseImportPath string) (*CycleInfo, error) {
	var (
		typeToPackage  = make(map[rapiddocsir.TypeId]PackageName)
		packageToTypes = make(map[PackageName][]*rapiddocsir.TypeDeclaration)
	)
	typeList := make([]*rapiddocsir.TypeDeclaration, 0, len(ir.Types))
	for typeId, typeDecl := range ir.Types {
		packageName := rapiddocsFilepathToImportPath(
			baseImportPath,
			typeDecl.Name.RapiddocsFilepath,
		)
		typeToPackage[typeId] = packageName
		typeList = append(typeList, typeDecl)
		packageToTypes[packageName] = append(packageToTypes[packageName], typeDecl)
	}
	sort.Slice(typeList, func(i, j int) bool { return typeList[i].Name.TypeId < typeList[j].Name.TypeId })
	// Create a graph, where ever node is represented by a rapiddocsir.TypeId,
	// and each edge is defined by a reference between two types.
	typeGraph, err := typeGraphFromTypes(typeList)
	if err != nil {
		return nil, err
	}
	// Sort all of the package to types lists for deterministic results.
	for _, typeDecls := range packageToTypes {
		sort.Slice(
			typeDecls,
			func(i, j int) bool {
				return typeGraph.GetVertexByID(typeDecls[i].Name.TypeId).Label() < typeGraph.GetVertexByID(typeDecls[j].Name.TypeId).Label()
			},
		)
	}
	packageGraph, err := packageGraphFromTypes(typeList, typeToPackage)
	if err != nil {
		return nil, err
	}
	// Then find all the strongly connected components that need to be resolved.
	invalidComponents := invalidComponentsFromGraph(packageGraph)
	if len(invalidComponents) == 0 {
		return nil, nil
	}
	var cycleInfos []*CycleInfo
	for _, invalidComponent := range invalidComponents {
		cycleInfo, err := resolveCycleForComponent(
			ir.Types,
			typeGraph,
			typeToPackage,
			packageToTypes,
			invalidComponent,
		)
		if err != nil {
			return nil, err
		}
		cycleInfos = append(cycleInfos, cycleInfo)
	}
	var (
		leafTypeMap      = make(map[rapiddocsir.TypeId]struct{})
		recursiveTypeMap = make(map[rapiddocsir.TypeId]struct{})
	)
	for _, cycleInfo := range cycleInfos {
		for _, leafType := range cycleInfo.LeafTypes {
			leafTypeMap[leafType] = struct{}{}
		}
		for _, recursiveType := range cycleInfo.RecursiveTypes {
			recursiveTypeMap[recursiveType] = struct{}{}
		}
	}
	cycleInfo := &CycleInfo{
		LeafTypes:      stringSetToSortedSlice(leafTypeMap),
		RecursiveTypes: stringSetToSortedSlice(recursiveTypeMap),
	}
	return cycleInfo, nil
}

func typeGraphFromTypes(
	types []*rapiddocsir.TypeDeclaration,
) (gograph.Graph[rapiddocsir.TypeId], error) {
	graph := gograph.New[rapiddocsir.TypeId](gograph.Directed())
	for _, irType := range types {
		from := graph.AddVertexByLabel(irType.Name.TypeId)
		if from == nil {
			from = graph.GetVertexByID(irType.Name.TypeId)
		}
		for _, irReferencedTypeID := range irType.ReferencedTypes {
			to := graph.AddVertexByLabel(irReferencedTypeID)
			if to == nil {
				to = graph.GetVertexByID(irReferencedTypeID)
			}

			if graph.GetEdge(from, to) == nil {
				if _, err := graph.AddEdge(from, to); err != nil {
					return nil, err
				}
			}
		}
	}
	return graph, nil
}

func packageGraphFromTypes(
	types []*rapiddocsir.TypeDeclaration,
	typeToPackage map[rapiddocsir.TypeId]PackageName,
) (gograph.Graph[PackageName], error) {
	graph := gograph.New[PackageName](gograph.Directed())
	for _, irType := range types {
		fromPackageName := typeToPackage[irType.Name.TypeId]

		from := graph.AddVertexByLabel(fromPackageName)
		if from == nil {
			from = graph.GetVertexByID(fromPackageName)
		}

		for _, irReferencedTypeID := range irType.ReferencedTypes {
			toPackageName := typeToPackage[irReferencedTypeID]

			to := graph.AddVertexByLabel(toPackageName)
			if to == nil {
				to = graph.GetVertexByID(toPackageName)
			}

			if graph.GetEdge(from, to) == nil {
				if _, err := graph.AddEdge(from, to); err != nil {
					return nil, err
				}
			}
		}
	}
	return graph, nil
}

func invalidComponentsFromGraph(
	graph gograph.Graph[PackageName],
) [][]*gograph.Vertex[PackageName] {
	connectedComponents := connectivity.Kosaraju[PackageName](graph)
	var invalidComponents [][]*gograph.Vertex[PackageName]
	for _, component := range connectedComponents {
		if len(component) == 1 {
			continue
		}
		// Sort for deterministic results.
		sort.Slice(component, func(i, j int) bool { return component[i].Label() < component[j].Label() })
		invalidComponents = append(invalidComponents, component)
	}
	return invalidComponents
}

func resolveCycleForComponent(
	types map[rapiddocsir.TypeId]*rapiddocsir.TypeDeclaration,
	typeGraph gograph.Graph[rapiddocsir.TypeId],
	typeToPackage map[rapiddocsir.TypeId]PackageName,
	packageToTypes map[PackageName][]*rapiddocsir.TypeDeclaration,
	component []*gograph.Vertex[PackageName],
) (*CycleInfo, error) {
	componentPackageNames := make(map[PackageName]struct{})
	for _, vertex := range component {
		componentPackageNames[vertex.Label()] = struct{}{}
	}
	var (
		leafTypeMap      = make(map[rapiddocsir.TypeId]struct{})
		recursiveTypeMap = make(map[rapiddocsir.TypeId]struct{})
	)
	for _, vertex := range component {
		typeDecls, ok := packageToTypes[vertex.Label()]
		if !ok {
			return nil, fmt.Errorf("internal: type %s was not assigned to a package", vertex.Label())
		}
		for _, typeDecl := range typeDecls {
			if _, ok := leafTypeMap[typeDecl.Name.TypeId]; ok {
				// This type has already been categorized.
				continue
			}
			if _, ok := recursiveTypeMap[typeDecl.Name.TypeId]; ok {
				// This type has already been categorized.
				continue
			}
			currentTypeVertex := typeGraph.GetVertexByID(typeDecl.Name.TypeId)
			currentTypePackage := typeToPackage[typeDecl.Name.TypeId]
			// If this type only has incoming edges from other packages, it is considered
			// a leaf type.
			var hasExternalIncomingEdges bool
			for _, currentTypeEdge := range typeGraph.EdgesOf(currentTypeVertex) {
				otherTypeVertex := currentTypeEdge.OtherVertex(currentTypeVertex.Label())
				otherTypePackage := typeToPackage[otherTypeVertex.Label()]
				if _, ok := componentPackageNames[otherTypePackage]; !ok || currentTypePackage == otherTypePackage {
					// This dependency is permissible because either:
					//
					//  1. The edge exists within the same package.
					//  2. The edge exists between a package not included in the SCC.
					//
					continue
				}
				hasExternalIncomingEdges = hasExternalIncomingEdges || currentTypeEdge.Destination() == currentTypeVertex
			}
			if !hasExternalIncomingEdges {
				// This type only has dependencies within the same package or
				// only depends on types from other packages (i.e. it can
				// stay where it is).
				continue
			}
			typeIds := referencedTypeIdsForType(
				types,
				typeToPackage,
				typeDecl,
				componentPackageNames,
			)
			for _, typeId := range typeIds {
				leafTypeMap[typeId] = struct{}{}
			}
		}
	}
	// TODO: At this point, we've collected all the leaf types into a single set.
	// Now we should repeat the algorithm, but only on these candidate types. If any
	// of the types compose a SCC, then they need to be moved into a root common package,
	// aka the "recursive" types.
	return &CycleInfo{
		RecursiveTypes: stringSetToSortedSlice(recursiveTypeMap),
		LeafTypes:      stringSetToSortedSlice(leafTypeMap),
	}, nil
}

func referencedTypeIdsForType(
	types map[rapiddocsir.TypeId]*rapiddocsir.TypeDeclaration,
	typeToPackage map[rapiddocsir.TypeId]PackageName,
	typeDecl *rapiddocsir.TypeDeclaration,
	componentPackageNames map[PackageName]struct{},
) []string {
	result := make(map[string]struct{})
	referencedTypeIdsForTypeRecurse(
		types,
		typeToPackage,
		typeDecl,
		componentPackageNames,
		result,
	)
	return stringSetToSortedSlice(result)
}

func referencedTypeIdsForTypeRecurse(
	types map[rapiddocsir.TypeId]*rapiddocsir.TypeDeclaration,
	typeToPackage map[rapiddocsir.TypeId]PackageName,
	typeDecl *rapiddocsir.TypeDeclaration,
	componentPackageNames map[PackageName]struct{},
	result map[string]struct{},
) {
	if _, ok := result[typeDecl.Name.TypeId]; ok {
		return
	}
	result[typeDecl.Name.TypeId] = struct{}{}
	for _, referencedTypeID := range typeDecl.ReferencedTypes {
		packageName := typeToPackage[referencedTypeID]
		if _, ok := componentPackageNames[packageName]; !ok {
			// The referenced type isn't included in the SCC, so
			// we can ignore it (and its descendants).
			continue
		}
		referencedTypeIdsForTypeRecurse(
			types,
			typeToPackage,
			types[referencedTypeID],
			componentPackageNames,
			result,
		)
	}
}

// replaceFilepathForType crawls throughout the entire IR, replacing
// every reference of the given TypeId to use the given RapiddocsFilepath.
func replaceFilepathForTypeInIR(
	ir *rapiddocsir.IntermediateRepresentation,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if ir.Auth != nil {
		for _, irScheme := range ir.Auth.Schemes {
			if irScheme.Header != nil && irScheme.Header.ValueType != nil {
				replaceFilepathForTypeInTypeReference(
					irScheme.Header.ValueType,
					typeId,
					rapiddocsFilepath,
				)
			}
		}
	}
	for _, irHeader := range ir.Headers {
		replaceFilepathForTypeInTypeReference(
			irHeader.ValueType,
			typeId,
			rapiddocsFilepath,
		)
	}
	for _, irType := range ir.Types {
		replaceFilepathForTypeInDeclaredTypeName(
			irType.Name,
			typeId,
			rapiddocsFilepath,
		)
		if irType.Shape != nil {
			replaceFilepathForTypeInType(
				irType.Shape,
				typeId,
				rapiddocsFilepath,
			)
		}
		for _, referencedType := range declaredTypeNamesForTypeIDs(ir, irType.ReferencedTypes) {
			replaceFilepathForTypeInDeclaredTypeName(
				referencedType,
				typeId,
				rapiddocsFilepath,
			)
		}
	}
	for _, irService := range ir.Services {
		for _, irEndpoint := range irService.Endpoints {
			for _, irHeader := range irEndpoint.Headers {
				replaceFilepathForTypeInTypeReference(
					irHeader.ValueType,
					typeId,
					rapiddocsFilepath,
				)
			}
			for _, irPathParameter := range irEndpoint.PathParameters {
				replaceFilepathForTypeInTypeReference(
					irPathParameter.ValueType,
					typeId,
					rapiddocsFilepath,
				)
			}
			for _, irPathParameter := range irEndpoint.AllPathParameters {
				replaceFilepathForTypeInTypeReference(
					irPathParameter.ValueType,
					typeId,
					rapiddocsFilepath,
				)
			}
			for _, irQueryParameter := range irEndpoint.QueryParameters {
				replaceFilepathForTypeInTypeReference(
					irQueryParameter.ValueType,
					typeId,
					rapiddocsFilepath,
				)
			}
			if irEndpoint.RequestBody != nil {
				replaceFilepathForTypeInHttpRequestBody(irEndpoint.RequestBody, typeId, rapiddocsFilepath)
			}
			if irEndpoint.SdkRequest != nil && irEndpoint.SdkRequest.Shape != nil && irEndpoint.SdkRequest.Shape.JustRequestBody != nil {
				replaceFilepathForTypeInTypeReference(irEndpoint.SdkRequest.Shape.JustRequestBody.TypeReference.RequestBodyType, typeId, rapiddocsFilepath)
			}
			if irEndpoint.Response != nil {
				replaceFilepathForTypeInHttpResponse(irEndpoint.Response, typeId, rapiddocsFilepath)
			}
		}
	}
	for _, irError := range ir.Errors {
		replaceFilepathForTypeInTypeReference(irError.Type, typeId, rapiddocsFilepath)
	}
	for _, irPathParameter := range ir.PathParameters {
		replaceFilepathForTypeInTypeReference(irPathParameter.ValueType, typeId, rapiddocsFilepath)
	}
	for _, irVariable := range ir.Variables {
		replaceFilepathForTypeInTypeReference(irVariable.Type, typeId, rapiddocsFilepath)
	}
}

func replaceFilepathForTypeInHttpRequestBody(
	httpRequestBody *rapiddocsir.HttpRequestBody,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if httpRequestBody.InlinedRequestBody != nil {
		for _, extend := range httpRequestBody.InlinedRequestBody.Extends {
			replaceFilepathForTypeInDeclaredTypeName(extend, typeId, rapiddocsFilepath)
		}
		for _, property := range httpRequestBody.InlinedRequestBody.Properties {
			replaceFilepathForTypeInTypeReference(property.ValueType, typeId, rapiddocsFilepath)
		}
	}
	if httpRequestBody.Reference != nil {
		replaceFilepathForTypeInTypeReference(httpRequestBody.Reference.RequestBodyType, typeId, rapiddocsFilepath)
	}
	if httpRequestBody.FileUpload != nil {
		for _, property := range httpRequestBody.FileUpload.Properties {
			if property.BodyProperty != nil {
				replaceFilepathForTypeInTypeReference(property.BodyProperty.ValueType, typeId, rapiddocsFilepath)
			}
		}
	}
}

func replaceFilepathForTypeInHttpResponse(
	httpResponse *rapiddocsir.HttpResponse,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if httpResponse.Body != nil && httpResponse.Body.Json != nil {
		if typeReference := typeReferenceFromJsonResponse(httpResponse.Body.Json); typeReference != nil {
			replaceFilepathForTypeInTypeReference(typeReference, typeId, rapiddocsFilepath)
		}
	}
	if httpResponse.Body != nil && httpResponse.Body.Streaming != nil {
		if httpResponse.Body.Streaming.Json != nil {
			replaceFilepathForTypeInTypeReference(httpResponse.Body.Streaming.Json.Payload, typeId, rapiddocsFilepath)
		}
		if httpResponse.Body.Streaming.Sse != nil {
			replaceFilepathForTypeInTypeReference(httpResponse.Body.Streaming.Sse.Payload, typeId, rapiddocsFilepath)
		}
	}
}

func replaceFilepathForTypeInType(
	irType *rapiddocsir.Type,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if alias := irType.Alias; alias != nil {
		replaceFilepathForTypeInTypeReference(alias.AliasOf, typeId, rapiddocsFilepath)
		replaceFilepathForTypeInResolvedTypeReference(alias.ResolvedType, typeId, rapiddocsFilepath)
	}
	if object := irType.Object; object != nil {
		for _, extend := range object.Extends {
			replaceFilepathForTypeInDeclaredTypeName(extend, typeId, rapiddocsFilepath)
		}
		for _, property := range object.Properties {
			replaceFilepathForTypeInTypeReference(property.ValueType, typeId, rapiddocsFilepath)
		}
	}
	if union := irType.Union; union != nil {
		for _, extend := range union.Extends {
			replaceFilepathForTypeInDeclaredTypeName(extend, typeId, rapiddocsFilepath)
		}
		for _, singleUnionType := range union.Types {
			properties := singleUnionType.Shape
			if properties.SamePropertiesAsObject != nil {
				replaceFilepathForTypeInDeclaredTypeName(properties.SamePropertiesAsObject, typeId, rapiddocsFilepath)
			}
			if properties.SingleProperty != nil {
				replaceFilepathForTypeInTypeReference(properties.SingleProperty.Type, typeId, rapiddocsFilepath)
			}
		}
		for _, property := range union.BaseProperties {
			replaceFilepathForTypeInTypeReference(property.ValueType, typeId, rapiddocsFilepath)
		}
	}
	if undiscriminatedUnion := irType.UndiscriminatedUnion; undiscriminatedUnion != nil {
		for _, member := range undiscriminatedUnion.Members {
			replaceFilepathForTypeInTypeReference(member.Type, typeId, rapiddocsFilepath)
		}
	}
	return
}

func replaceFilepathForTypeInResolvedTypeReference(
	resolvedTypeReference *rapiddocsir.ResolvedTypeReference,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if container := resolvedTypeReference.Container; container != nil {
		replaceFilepathForTypeInContainer(container, typeId, rapiddocsFilepath)
	}
	if resolvedTypeReference.Named != nil && resolvedTypeReference.Named.Name.TypeId == typeId {
		resolvedTypeReference.Named.Name.RapiddocsFilepath = rapiddocsFilepath
	}
}

func replaceFilepathForTypeInTypeReference(
	typeReference *rapiddocsir.TypeReference,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if container := typeReference.Container; container != nil {
		replaceFilepathForTypeInContainer(container, typeId, rapiddocsFilepath)
	}
	if typeReference.Named != nil && typeReference.Named.TypeId == typeId {
		typeReference.Named.RapiddocsFilepath = rapiddocsFilepath
	}
}

func replaceFilepathForTypeInContainer(
	container *rapiddocsir.ContainerType,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if container.List != nil {
		replaceFilepathForTypeInTypeReference(container.List, typeId, rapiddocsFilepath)
	}
	if container.Map != nil {
		replaceFilepathForTypeInTypeReference(container.Map.KeyType, typeId, rapiddocsFilepath)
		replaceFilepathForTypeInTypeReference(container.Map.ValueType, typeId, rapiddocsFilepath)
	}
	if container.Optional != nil {
		replaceFilepathForTypeInTypeReference(container.Optional, typeId, rapiddocsFilepath)
	}
	if container.Set != nil {
		replaceFilepathForTypeInTypeReference(container.Set, typeId, rapiddocsFilepath)
	}
}

func replaceFilepathForTypeInDeclaredTypeName(
	declaredTypeName *rapiddocsir.DeclaredTypeName,
	typeId rapiddocsir.TypeId,
	rapiddocsFilepath *rapiddocsir.RapiddocsFilepath,
) {
	if declaredTypeName.TypeId == typeId {
		declaredTypeName.RapiddocsFilepath = rapiddocsFilepath
	}
}

// commonPackageElement is prepended to all of the leaf types'
// RapiddocsFilepath so that they're deposited in a common, shared
// package.
var commonPackageElement = &rapiddocsir.Name{
	OriginalName: "common",
	CamelCase: &rapiddocsir.SafeAndUnsafeString{
		UnsafeName: "common",
		SafeName:   "common",
	},
	PascalCase: &rapiddocsir.SafeAndUnsafeString{
		UnsafeName: "Common",
		SafeName:   "Common",
	},
	SnakeCase: &rapiddocsir.SafeAndUnsafeString{
		UnsafeName: "common",
		SafeName:   "common",
	},
	ScreamingSnakeCase: &rapiddocsir.SafeAndUnsafeString{
		UnsafeName: "COMMON",
		SafeName:   "COMMON",
	},
}
