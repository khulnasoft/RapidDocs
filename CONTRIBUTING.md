# Contributing

Thanks for being here! This monorepo contains Rapiddocs's documentation, the Rapiddocs CLI, the Rapiddocs Definition,
the OpenAPI importer, as well as all of our generators.

Rapiddocs is open source, but many of the people working on it do so as their day job. As a potential contributor,
your changes and ideas are welcome, but we can't guarantee that they will be prioritized nor reviewed in a
timely manner (_if ever_). With that said, we generally encourage users to start with a GitHub issue to
discuss a feature or fix before writing any code. You're still welcome to include a patch as a proof-of-concept,
but please do not be offended if we rewrite your patch from scratch.

Like all open-source projects, Rapiddocs's resources are limited. If your patch isn’t a top priority, it may not
receive the attention you expect.

<br>

## Setup

The Rapiddocs repo is primarily written in TypeScript and relies on [PnPm](https://pnpm.io/) for package management.

Once you have cloned or forked the repository, run through the steps below.

### Step 1: Install dependencies

```sh
pnpm install
```

### Step 2: Compile

To compile all the packages in this monorepo, run `pnpm compile`.

To compile a single package, filter to the relevant package: `pnpm --filter @khulnasoft/openapi-parser compile`.

### Step 3: Testing

This repo contains both unit tests and integration (end-to-end) tests.

To run all the unit tests: `pnpm test`.

To run unit tests for a single package: `pnpm --filter @khulnasoft/openapi-parser test`

To run the integration tests: `pnpm test:ete`.

Many of our tests rely on [snapshot testing](https://jestjs.io/docs/snapshot-testing). To rewrite snapshots, use `pnpm test:update` or `pnpm test:ete:update`.

<br>

## Repository Architecture

Below we talk through the large components of this monorepo and how to contribute to each one.

<br>

## Documentation

Rapiddocs's documentation is hosted live at the URL https://buildwithrapiddocs.com/learn. We appreciate any help we can get that makes our documentation more digestible.

If you find gaps within our documentation, please open an [issue](https://github.com/khulnasoft/rapiddocs/issues/new?assignees=&labels=documentation&projects=&template=documentation-suggestion.md&title=%5BRapiddocs%27s+Documentation%5D+)

### Editing Documentation

Our documentation is powered by Rapiddocs's Docs product. All of the configuration for the docs lives in [docs.yml](./rapiddocs/docs.yml).

To edit the docs, you can modify `docs.yml` or any of the markdown that it references.

To validate that the docs, run:

```sh
rapiddocs check
```

To preview the documentation, run:

```sh
rapiddocs docs dev
```

Finally, when you make a PR to update the docs, a PR preview link will be generated which will allow you
to test if your changes came out as intended. [Here](https://github.com/khulnasoft/rapiddocs/pull/4330) is a sample PR with a preview link.

<br>

## Rapiddocs CLI

The Rapiddocs CLI lives in a directory called [cli](./packages/cli/cli/) and the entrypoint is [cli.ts](./packages/cli/cli/src/cli.ts).

### Building the CLI from source

For testing purposes, you can build a local version of the CLI by running `pnpm rapiddocs:build`. This compiles and builds a CLI
that communicates with our production cloud environment.

The CLI is outputted to `packages/cli/cli/dist/prod/cli.cjs`.

Once the CLI has been built, you can navigate to any `rapiddocs` folder and invoke it by running

```sh
FERN_NO_VERSION_REDIRECTION=true node /<path to rapiddocs git repo>/packages/cli/cli/dist/prod/cli.cjs <args>
```

### Development CLI

To build a CLI that communicates with Rapiddocs's development cloud environment, run the command `pnpm rapiddocs-dev:build`.

Once the CLI has been built, you can navigate to any `rapiddocs` folder and invoke it by running

```sh
FERN_NO_VERSION_REDIRECTION=true node /<path to rapiddocs git repo>/packages/cli/cli/dist/dev/cli.cjs <args>
```

<br>

## Generators

All of Rapiddocs's generators live in a directory called [generators](./generators/). This directory contains generators for several languages such as
[typescript](./generators/typescript/), [python](./generators/python/), [go](./generators/go).

Some of the generators are written in the language they generate (i.e. Python is written in python, Go is written in Go, and Java is written in Java).
We are moving to a world where each generator will be written in TypeScript so that we can share more utilities and enforce a consistent structure
in the generator.

### Generator Testing

**Note**: Please make sure that the docker daemon is running before running commands below.

To test our generators we have built a CLI called seed.

Seed handles building the generators from source and running them against all of the
[test definitions](./test-definitions/rapiddocs/) that are present in the repository. Generated code is then stored in a directory named
[seed](./seed/).

Each generator configures a `seed.yml`. For example, the TypeScript generator's configuration lives [here](./seed/ts-sdk/seed.yml).

Seed also handles running scripts against the generated code to make sure that the generated code compiles and works
as intended. For example, in the TypeScript generator seed runs `yarn install` and `yarn build` to compile the source code.

To build seed, simply run

```sh
pnpm seed:build
```

**Note**: If you make any changes to the seed [source code](./packages/seed/src/) then you will need to rerun `pnpm seed:build`.

To run seed, you can use the command:

```
pnpm seed test [--generator <generator-id>] [--fixture <fixture-name>] [--skip-scripts] [--local]
```

Below are some examples of using the command.

- For a single generator: `pnpm seed test --generator python-sdk`
- For a single generator and test definition: `pnpm seed test --generator python-sdk --fixture file-download`
- For a single generator, test definition, and skipping scripts: `pnpm seed test --generator python-sdk --fixture file-download --skip-scripts`
- For running the generator locally (not on docker): `pnpm seed test --generator python-sdk`

### Running seed against a custom rapiddocs definition

It may be valuable to run seed on a particular Rapiddocs definition or OpenAPI spec. To do this,
you can use the `seed run` command and point it at the rapiddocs folder:

```
pnpm seed run [--generator <generator-id>] [--path /path/to/rapiddocs/folder] [--audience <audience>]
```

Below are some examples of using the command.

- Pointed at a rapiddocs folder: `pnpm seed run --generator ts-sdk --path /Users/jdoe/rapiddocs --audience external`
- Pointed at a rapiddocs folder with an audience: `pnpm seed run --generator ts-sdk --path /Users/jdoe/rapiddocs`
- Pointed at a rapiddocs folder with multiple apis: `pnpm seed run --generator ts-sdk --path /Users/jdoe/rapiddocs/apis/<name-of-api>`

<br>

## Feedback

If you have any feedback on what we could improve, please [open an issue](https://github.com/khulnasoft/rapiddocs/issues/new) to discuss it!
