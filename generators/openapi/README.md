<br/>
<div align="center">
  <a href="https://www.buildwithrapiddocs.com/?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs-openapi&utm_content=logo">
    <img src="/rapiddocs/images/logo-primary.svg" height="50" align="center" alt="Rapiddocs logo" />
  </a>
  
  <br/>

# OpenAPI Generator

[![Contributors](https://img.shields.io/github/contributors/khulnasoft/rapiddocs-openapi.svg)](https://GitHub.com/dotnet/docs/graphs/contributors/)
[![Pulls-opened](https://img.shields.io/github/issues-pr/khulnasoft/rapiddocs-openapi.svg)](https://GitHub.com/dotnet/docs/pulls?q=is%3Aissue+is%3Aopened)
[![Pulls-merged](https://img.shields.io/github/issues-search/khulnasoft/rapiddocs-openapi?label=merged%20pull%20requests&query=is%3Apr%20is%3Aclosed%20is%3Amerged&color=darkviolet)](https://github.com/dotnet/docs/pulls?q=is%3Apr+is%3Aclosed+is%3Amerged)

[![Discord](https://img.shields.io/badge/Join%20Our%20Community-black?logo=discord)](https://discord.com/invite/JkkXumPzcG)

</div>

The OpenAPI specification, or OAS, defines a standard, language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service.

This repository contains the source for the [Rapiddocs](https://www.buildwithrapiddocs.com/?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs-openapi&utm_content=repo-contains) generator that produces an OpenAPI specification:

- `rapiddocsapi/rapiddocs-openapi`

The generator is written in TypeScript and produces an OpenAPI `3.0.0` specification. If you have a need for Rapiddocs to generate a more recent specification version, let us know in [this issue](https://github.com/khulnasoft/rapiddocs-openapi/issues/65).

Rapiddocs handles transforming a Rapiddocs specification into Rapiddocs _intermediate representation_. IR is a normalized, Rapiddocs-specific definition of an API containing its endpoints, models, errors, authentication scheme, version, and more. Then the OpenAPI generator takes over and turns the IR into a production-ready OpenAPI specification.

## What is Rapiddocs?

Rapiddocs is a toolkit for designing, building, and consuming REST APIs. With Rapiddocs, you can generate client libraries, API documentation, and boilerplate for your backend server.

Head over to the [official Rapiddocs website](https://www.buildwithrapiddocs.com/?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs-openapi&utm_content=homepage) for more information, or head over to our [Documentation](https://www.buildwithrapiddocs.com/docs/intro?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs-openapi&utm_content=documentation) to dive straight in and find out what Rapiddocs can do for you!

## Generating an OpenAPI specification

This generator is used via the [Rapiddocs CLI](https://github.com/khulnasoft/rapiddocs) by defining the OpenAPI generator:

```yml
- name: rapiddocsapi/openapi
  version: 0.0.28
  output:
    location: local-file-system
    path: ../generated/openapi
```

By default, Rapiddocs runs the generators in the cloud. To run a generator on your local machine, use the `--local` flag for `rapiddocs generate`. This will run the generator locally in a Docker container, allowing you to inspect its logs and output. [Read more.](https://buildwithrapiddocs.com/docs/compiler/cli-reference#running-locally)

## Configuration

You can customize the behavior of generators in `generators.yml`:

```yml
default-group: local
groups:
  local:
    generators:
      - name: rapiddocsapi/rapiddocs-openapi
        version: 0.0.27
        config: # <--
          format: json
```

#### ✨ `format`

**Type:** enum<string>: 'json' | 'yaml'

**Default:** `yaml`

When configured, the generator outputs OAS files in the specified format.

#### ✨ `customOverrides`

**Type:** object

**Default:** {}

When configured, the object is merged into the generated OAS file. This allows you to add custom fields to the specification.

## Versions

Find the latest version number and changelog for this generator in [this Spec Generators table](https://github.com/khulnasoft/rapiddocs?tab=readme-ov-file#spec-generators). The changelog shows earlier version numbers, if any. You can directly use these version numbers in your generator configuration files.

For instance, if you want to use version `0.0.27` of the OpenAPI generator:

```yaml
default-group: local
groups:
  local:
    generators:
      - name: rapiddocsapi/rapiddocs-openapi
        version: 0.0.27
        output:
          location: local-file-system
          path: ../generated/openapi
```

Rapiddocs will handle the rest automatically.
