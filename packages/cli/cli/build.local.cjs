const packageJson = require("./package.json");
const tsup = require('tsup');
const { writeFile } = require("fs/promises");
const path = require("path");

main();

async function main() {
    await tsup.build({
        entry: ['src/cli.ts'],
        format: ['cjs'],
        minify: false,
        outDir: 'dist/local',
        env: {
            AUTH0_DOMAIN: "rapiddocs-dev.us.auth0.com",
            AUTH0_CLIENT_ID: "4QiMvRvRUYpnycrVDK2M59hhJ6kcHYFQ",
            DEFAULT_FIDDLE_ORIGIN: "https://fiddle-coordinator-dev2.buildwithrapiddocs.com",
            DEFAULT_VENUS_ORIGIN: "https://venus-dev2.buildwithrapiddocs.com",
            DEFAULT_FDR_ORIGIN: "http://localhost:8080",
            VENUS_AUDIENCE: "venus-dev",
            LOCAL_STORAGE_FOLDER: ".rapiddocs-local",
            POSTHOG_API_KEY: null,
            DOCS_DOMAIN_SUFFIX: "docs.dev.buildwithrapiddocs.com",
            DOCS_PREVIEW_BUCKET: 'https://dev2-local-preview-bundle2.s3.amazonaws.com/',
            CLI_NAME: "rapiddocs-local",
            CLI_VERSION: process.argv[2] || packageJson.version,
            CLI_PACKAGE_NAME: "khulnasoft",
        },
    }); 

    process.chdir(path.join(__dirname, "dist/local"));
    
    // write cli's package.json
    await writeFile(
        "package.json",
        JSON.stringify(
            {
                name: "khulnasoft",
                version: process.argv[2] || packageJson.version,
                repository: packageJson.repository,
                files: ["cli.cjs"],
                bin: { rapiddocs: "cli.cjs" }
            },
            undefined,
            2
        )
    );
}