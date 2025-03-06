.PHONY: build
build:
	docker build -f ./model/Dockerfile -t rapiddocsapi/rapiddocs-go-model .
	docker build -f ./sdk/Dockerfile -t rapiddocsapi/rapiddocs-go-sdk .
	docker build -f ./fiber/Dockerfile -t rapiddocsapi/rapiddocs-go-fiber .
	docker tag rapiddocsapi/rapiddocs-go-sdk rapiddocsapi/rapiddocs-go-sdk:0.0.0

.PHONY: generate
generate: install
	cd internal/rapiddocs; rapiddocs-go-model ir_config.json

.PHONY: install
install:
	go install ./cmd/...

.PHONY: test
test: install
	go test ./...

.PHONY: fixtures
fixtures: install
	@./scripts/update-fixtures.sh
