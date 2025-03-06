const packageJson = require("./package.json");
const tsup = require('tsup');
const { writeFile } = require("fs/promises");
const path = require("path");

main();

async function main() {
    await tsup.build({
        entry: ['src/cli.ts'],
        format: ['cjs'],
        minify: true,
        outDir: 'dist/prod',
        env: {
            AUTH0_DOMAIN: "rapiddocs-prod.us.auth0.com",
            AUTH0_CLIENT_ID: "syaWnk6SjNoo5xBf1omfvziU3q7085lh",
            DEFAULT_FIDDLE_ORIGIN: "https://fiddle-coordinator.buildwithrapiddocs.com",
            DEFAULT_VENUS_ORIGIN: "https://venus.buildwithrapiddocs.com",
            DEFAULT_FDR_ORIGIN: "https://registry.buildwithrapiddocs.com",
            VENUS_AUDIENCE: "venus-prod",
            LOCAL_STORAGE_FOLDER: ".rapiddocs",
            POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
            DOCS_DOMAIN_SUFFIX: "docs.buildwithrapiddocs.com",
            DOCS_PREVIEW_BUCKET: 'https://prod-local-preview-bundle2.s3.amazonaws.com/',
            CLI_NAME: "rapiddocs",
            CLI_VERSION: process.argv[2] || packageJson.version,
            CLI_PACKAGE_NAME: "khulnasoft",
        },
    });     
    
    process.chdir(path.join(__dirname, "dist/prod"));
    
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
