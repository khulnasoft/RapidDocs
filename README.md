<br/>
<div align="center">
  <a href="https://www.buildwithrapiddocs.com/?utm_source=github&utm_medium=readme&utm_campaign=rapiddocs&utm_content=logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="/rapiddocs/images/logo-white.svg">
      <source media="(prefers-color-scheme: light)" srcset="/rapiddocs/images/logo-primary.svg">
      <img alt="logo" src="/rapiddocs/images/logo-primary.svg" height="80" align="center">
    </picture>
  </a>
<br/>

<br/>

[![2023 Y Combinator Startup](https://img.shields.io/badge/Y%20Combinator-2023-orange)](https://www.ycombinator.com/companies/rapiddocs)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)

[![Slack](https://img.shields.io/badge/slack-pink.svg)](https://join.slack.com/t/rapiddocs-community/shared_invite/zt-2dpftfmif-MuAegl8AfP_PK8s2tx350Q)
[![Documentation](https://img.shields.io/badge/Read%20our%20Documentation-black?logo=book)](https://buildwithrapiddocs.com/learn/home?utm_source=khulnasoft/rapiddocs/readme-read-our-documentation)

</div>

Rapiddocs is a toolkit that allows you to input your API Definition and output SDKs and API documentation. Rapiddocs is compatible with the OpenAPI specification (formerly Swagger).

<div align="center">
    <a href="/rapiddocs/images/overview-dark.png" target="_blank">
        <picture>
            <source srcset="/rapiddocs/images/overview-dark.png" media="(prefers-color-scheme: dark)">
            <source srcset="/rapiddocs/images/overview-light.png" media="(prefers-color-scheme: light)">
            <img src="/rapiddocs/images/overview-light.png" width="700" alt="Overview Diagram">
        </picture>
    </a>
</div>

## 🌿 SDKs

The Rapiddocs toolkit is available via a command line interface (CLI) and requires Node 18+. To install it, run:

```bash
npm install -g khulnasoft
```

Initialize Rapiddocs with your OpenAPI spec:

```bash
rapiddocs init --openapi ./path/to/openapi.yml
# or
rapiddocs init --openapi https://link.buildwithrapiddocs.com/plantstore-openapi
```

Your directory should look like the following:

```yaml
rapiddocs/
├─ rapiddocs.config.json
├─ generators.yml # generators you're using
└─ openapi/
  └─ openapi.json # your openapi document
```

Finally, to invoke the generator, run:

```bash
rapiddocs generate
```

🎉 Once the command completes, you'll see your SDK in `/generated/sdks/typescript`.

## 🌿 API Documentation

Rapiddocs can also build and host a documentation website with an auto-generated API reference. Write additional pages in markdown and have them versioned with git. Search, SEO, dark mode, and popular components are provided out-of-the-box. Plus, you can customize the colors, font, logo, and domain name.

Check out docs built with Rapiddocs:

- [docs.vellum.ai](https://docs.vellum.ai)
- [docs.superagent.sh](https://docs.superagent.sh/)
- [docs.hume.ai](https://docs.hume.ai/)
- [docs.deepgram.com](https://docs.deepgram.com/)

Get started [here](https://github.com/khulnasoft/docs-starter-openapi).

## 🌿 Generators

Generators are process that take your API Definition as input and output artifacts (SDKs,
Postman Collections, Server boilerplate, etc.). To add a generator run `rapiddocs add <generator id>`

### SDK Generators

| Generator ID                       | Latest Version                                                                                    | Entrypoint                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `rapiddocsapi/rapiddocs-typescript-node-sdk` | ![Typescript Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-typescript-node-sdk) | [cli.ts](./generators/typescript/sdk/cli/src/nodeCli.ts)                      |
| `rapiddocsapi/rapiddocs-python-sdk`          | ![Python Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-python-sdk)              | [cli.py](./generators/python/src/rapiddocs_python/generators/sdk/cli.py)           |
| `rapiddocsapi/rapiddocs-java-sdk`            | ![Java Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-java-sdk)                  | [Cli.java](./generators/java/sdk/src/main/java/com/rapiddocs/java/client/Cli.java) |
| `rapiddocsapi/rapiddocs-ruby-sdk`            | ![Ruby Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-ruby-sdk)                  | [cli.ts](./generators/ruby/sdk/src/cli.ts)                                    |
| `rapiddocsapi/rapiddocs-go-sdk`              | ![Go Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-go-sdk)                      | [main.go](./generators/go/cmd/rapiddocs-go-sdk/main.go)                            |
| `rapiddocsapi/rapiddocs-csharp-sdk`          | ![C# Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-csharp-sdk)                  | [cli.ts](./generators/csharp/sdk/src/cli.ts)                                  |
| `rapiddocsapi/rapiddocs-php-sdk`             | ![PHP Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-php-sdk)                    | [cli.ts](./generators/php/sdk/src/cli.ts)                                     |

### Server-side Generators

Rapiddocs's server-side generators output boilerplate application code (models and networking logic). This is intended for spec-first or API-first developers, who write their API definition (as an OpenAPI spec or Rapiddocs definition) and want to generate backend code.

| Generator ID                      | Latest Version                                                                                                  | Entrypoint                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `rapiddocsapi/rapiddocs-typescript-express` | ![Typescript Express Server Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-typescript-express) | [cli.ts](./generators/typescript/express/cli/src/cli.ts)                         |
| `rapiddocsapi/rapiddocs-fastapi-server`     | ![Python FastAPI Server Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-fastapi-server)         | [cli.py](./generators/python/src/rapiddocs_python/generators/sdk/cli.py)              |
| `rapiddocsapi/rapiddocs-java-spring`        | ![Java Spring Server Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-java-spring)               | [Cli.java](./generators/java/spring/src/main/java/com/rapiddocs/java/spring/Cli.java) |

### Model Generators

Rapiddocs's model generators will output schemas or types defined in your OpenAPI spec or Rapiddocs Definition.

| Generator ID                  | Latest Version                                                                                   | Entrypoint                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `rapiddocsapi/rapiddocs-pydantic-model` | ![Pydantic Model Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-pydantic-model) | [cli.py](./generators/python/src/rapiddocs_python/generators/sdk/cli.py)           |
| `rapiddocsapi/java-model`          | ![Java Model Generator Version](https://img.shields.io/docker/v/rapiddocsapi/java-model)              | [Cli.java](./generators/java/sdk/src/main/java/com/rapiddocs/java/client/Cli.java) |
| `rapiddocsapi/rapiddocs-ruby-model`     | ![Ruby Model Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-ruby-model)         | [cli.ts](./generators/ruby/model/src/cli.ts)                                  |
| `rapiddocsapi/rapiddocs-go-model`       | ![Go Model Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-go-model)             | [main.go](./generators/go/cmd/rapiddocs-go-model/main.go)                          |

### Spec Generators

Rapiddocs's spec generators can output an OpenAPI spec or a Postman collection.

> **Note**: The OpenAPI spec generator is primarily intended for Rapiddocs Definition users. This prevents lock-in so that one can always export to OpenAPI.

| Generator ID           | Latest Version                                                                     | Entrypoint                                |
| ---------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- |
| `rapiddocsapi/rapiddocs-openapi` | ![OpenAPI Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-openapi) | [cli.ts](./generators/openapi/src/cli.ts) |
| `rapiddocsapi/rapiddocs-postman` | ![Postman Generator Version](https://img.shields.io/docker/v/rapiddocsapi/rapiddocs-postman) | [cli.ts](./generators/postman/src/cli.ts) |

## 🌿 CLI Commands

Here's a quick look at the most popular CLI commands. View the documentation for [all CLI commands](https://buildwithrapiddocs.com/learn/cli-api/cli-reference/commands).

`rapiddocs init`: adds a new starter API to your repository.

`rapiddocs check`: validate your API definition and Rapiddocs configuration.

`rapiddocs generate`: run the generators specified in `generators.yml` in the cloud.

`rapiddocs generate --local`: run the generators specified in `generators.yml` in docker locally.

`rapiddocs add <generator>`: include a new generator in your `generators.yml`. For example, `rapiddocs add rapiddocs-python-sdk`.

## Advanced

### API First

Rapiddocs supports developers and teams that want to be API-first or Spec-first.

Define your API, and use Rapiddocs to generate models, networking code and boilerplate application code. The generated code adds
type safety to your API implementation - if your backend doesn't implement the API correctly, it won't compile.

Frameworks currently supported:

- [Express](./generators/typescript)
- [Spring Boot](./generators/java)
- [FastAPI](./generators/python)

### Rapiddocs Definition

While we are big fans of OpenAPI, we know it isn't the _easiest_ format to read and write. If you're looking for an alternative,
give the Rapiddocs Definition a try.

Install the Rapiddocs CLI and initialize a Rapiddocs Project.

```bash
npm install -g khulnasoft
rapiddocs init
```

This will create the following folder structure in your project:

```yaml
rapiddocs/
├─ rapiddocs.config.json # root-level configuration
├─ generators.yml # generators you're using
└─ definition/
  ├─ api.yml  # API-level configuration
  └─ imdb.yml # endpoints, types, and errors
```

Here's what the `imdb.yml` starter file looks like:

```yaml
types:
  MovieId: string

  Movie:
    properties:
      id: MovieId
      title: string
      rating:
        type: double
        docs: The rating scale is one to five stars

  CreateMovieRequest:
    properties:
      title: string
      rating: double

service:
  auth: false
  base-path: /movies
  endpoints:
    createMovie:
      docs: Add a movie to the database
      method: POST
      path: /create-movie
      request: CreateMovieRequest
      response: MovieId

    getMovie:
      method: GET
      path: /{movieId}
      path-parameters:
        movieId: MovieId
      response: Movie
      errors:
        - MovieDoesNotExistError

errors:
  MovieDoesNotExistError:
    status-code: 404
    type: MovieId
```

Checkout open source projects that are using Rapiddocs Definitions:

- [Metriport](https://github.com/metriport/metriport/tree/develop/rapiddocs/definition)
- [Rivet](https://github.com/rivet-gg/rivet/tree/main/rapiddocs/definition)

## Inspiration

Rapiddocs is inspired by internal tooling built to enhance the developer experience. We stand on the shoulders of giants. While teams were responsible for building the following tools, we want to give a shout out to Mark Elliot (creator of Conjure at Palantir), Michael Dowling (creator of Smithy at AWS), and Ian McCrystal (creator of Stripe Docs).

## Community

[Join our Discord!](https://discord.com/invite/JkkXumPzcG) We are here to answer questions and help you get the most out of Rapiddocs.

## Contributing

We welcome community contributions. For guidelines, refer to our [CONTRIBUTING.md](/CONTRIBUTING.md).

![Rapiddocs Contributors](https://contrib.rocks/image?repo=khulnasoft/rapiddocs)
