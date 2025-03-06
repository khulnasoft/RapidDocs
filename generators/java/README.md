# Java Generator

This repository contains the source for the [Rapiddocs](<[https://buildwithrapiddocs.com](https://www.buildwithrapiddocs.com/?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs-java&utm_content=repo-contains)>) generators that produce Java artifacts:

- `rapiddocsapi/rapiddocs-java-sdk`
- `rapiddocsapi/rapiddocs-java-model`
- `rapiddocsapi/rapiddocs-java-spring`

The generator is written in Java and produces idiomatic code that feels hand-written and is friendly to read.

Rapiddocs handles transforming an API definition -- either an OpenAPI or Rapiddocs specification -- into Rapiddocs _intermediate representation_. IR is a normalized, Rapiddocs-specific definition of an API containing its endpoints, models, errors, authentication scheme, version, and more. Then the Java generator takes over and turns the IR into production-ready code.

## What is Rapiddocs?

Rapiddocs is a toolkit for designing, building, and consuming REST APIs. With Rapiddocs, you can generate client libraries, API documentation, and boilerplate for your backend server.

Head over to the [official Rapiddocs website](https://www.buildwithrapiddocs.com/?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs-java&utm_content=homepage) for more information, or head over to our [Documentation](https://www.buildwithrapiddocs.com/docs/intro?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs-java&utm_content=documentation) to dive straight in and find out what Rapiddocs can do for you!

## Generating Java

This generator is used via the [Rapiddocs CLI](https://github.com/khulnasoft/rapiddocs), by defining one of the aforementioned Java artifacts as a generator:

```yml
- name: rapiddocsapi/rapiddocs-java-sdk
  version: 0.3.7
  output:
    location: local-file-system
    path: ../generated/java
```

By default, Rapiddocs runs the generators in the cloud. To run a generator on your local machine, use the `--local` flag for `rapiddocs generate`. This will run the generator locally in a Docker container, allowing you to inspect its logs and output. [Read more.](https://buildwithrapiddocs.com/docs/compiler/cli-reference#running-locally)

## Configuration

You can customize the behavior of generators in `generators.yml`:

```yml
default-group: local
groups:
  local:
    generators:
      - name: rapiddocsapi/rapiddocs-java-sdk
        version: 0.4.9
        output:
          location: local-file-system
          path: ../generated/java
```

### SDK Configuration

The Java SDK generator supports the following options:

#### ✨ `unknown-as-optional`

**Type:** boolean

**Default:** `false`

When enabled, unknown types are defined as `Optional<Object>` rather than plain `Object`.

#### ✨ `wrapped-aliases`

**Type:** boolean

**Default:** `false`

When enabled, generates wrapper types for each alias to increase type-safety. For example if you have an alias `ResourceId: string` then if this is true, the generator will generate a ResourceId.java file. If false, it will just treat it as `java.util.String`.

### Spring Configuration

The Java Spring generator supports the following options:

#### ✨ `wrapped-aliases`

**Type:** boolean

**Default:** `false`

When enabled, generates wrapper types for each alias to increase type-safety. For example, if true and you have an alias `ResourceId: string` the generator will generate a ResourceId.java file. If false, it will just treat it as `java.util.String`.

#### ✨ `enable-public-constructors`

**Type:** boolean

**Default:** `false`

When enabled, generates public constructors for model types.

#### ✨ `client-class-name`

**Type:** string

**Default:** `<Organization>ApiClient`

#### ✨ `custom-dependencies`

**Type:** string

```yaml
custom-dependencies:
  - "implementation com.foo:bar:0.0.0"
  - "testImplementation com.foo:bar:0.0.0"
  - "api com.foo:bar:0.0.0"
```

The provided string will be used as the client class name.

## Versions

Find the latest version number and changelog for this generator in [this SDK Generators table](https://github.com/khulnasoft/rapiddocs?tab=readme-ov-file#sdk-generators). The changelog shows earlier version numbers, if any. You can directly use these version numbers in your generator configuration files.

For instance, if you want to use version `0.3.7` of the Java generator:

```yaml
default-group: local
groups:
  local:
    generators:
      - name: rapiddocsapi/rapiddocs-java-sdk
        version: 0.4.9
        output:
          location: local-file-system
          path: ../generated/java
```

Rapiddocs will handle the rest automatically.
