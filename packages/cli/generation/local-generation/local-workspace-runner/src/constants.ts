import path from "path";

export const DOCKER_RAPIDDOCS_DIRECTORY = "/rapiddocs";
export const DOCKER_CODEGEN_OUTPUT_DIRECTORY = path.join(DOCKER_RAPIDDOCS_DIRECTORY, "output");
export const DOCKER_GENERATOR_CONFIG_PATH = path.join(DOCKER_RAPIDDOCS_DIRECTORY, "config.json");
export const DOCKER_PATH_TO_IR = path.join(DOCKER_RAPIDDOCS_DIRECTORY, "ir.json");
export const DOCKER_PATH_TO_SNIPPET = path.join(DOCKER_RAPIDDOCS_DIRECTORY, "snippet.json");
export const DOCKER_PATH_TO_SNIPPET_TEMPLATES = path.join(DOCKER_RAPIDDOCS_DIRECTORY, "snippet-templates.json");
export const DOCKER_GENERATORS_DIRECTORY = path.join(DOCKER_RAPIDDOCS_DIRECTORY, "generators");
export const DOCKER_SOURCES_DIRECTORY = path.join(DOCKER_RAPIDDOCS_DIRECTORY, "sources");
