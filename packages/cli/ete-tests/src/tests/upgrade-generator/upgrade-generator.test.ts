/* eslint-disable jest/no-disabled-tests */
import { cp, readFile } from "fs/promises";
import path from "path";
import tmp from "tmp-promise";

import { AbsoluteFilePath, RelativeFilePath, getDirectoryContents, join } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";

const FIXTURES_DIR = path.join(__dirname, "fixtures");

describe("rapiddocs generator upgrade", () => {
    it("rapiddocs generator upgrade", async () => {
        // Create tmpdir and copy contents
        const tmpDir = await tmp.dir();
        const directory = AbsoluteFilePath.of(tmpDir.path);

        await cp(FIXTURES_DIR, directory, { recursive: true });

        await runRapiddocsCli(["generator", "upgrade"], {
            cwd: directory
        });

        const outputFile = join(directory, RelativeFilePath.of("version.txt"));
        await runRapiddocsCli(
            [
                "generator",
                "get",
                "--group",
                "python-sdk",
                "--generator",
                "rapiddocsapi/rapiddocs-python-sdk",
                "--version",
                "-o",
                outputFile
            ],
            {
                cwd: directory
            }
        );

        expect(JSON.parse((await readFile(outputFile)).toString()).version).not.toEqual("3.0.0");
    }, 60_000);

    it("rapiddocs generator upgrade with filters", async () => {
        // Create tmpdir and copy contents
        const tmpDir = await tmp.dir();
        const directory = AbsoluteFilePath.of(tmpDir.path);

        await cp(FIXTURES_DIR, directory, { recursive: true });

        await runRapiddocsCli(
            [
                "generator",
                "upgrade",
                "--group",
                "python-sdk",
                "--generator",
                "rapiddocsapi/rapiddocs-python-sdk",
                "--include-major"
            ],
            {
                cwd: directory
            }
        );

        const outputFile = join(directory, RelativeFilePath.of("version.txt"));
        await runRapiddocsCli(
            [
                "generator",
                "get",
                "--group",
                "python-sdk",
                "--generator",
                "rapiddocsapi/rapiddocs-python-sdk",
                "--version",
                "-o",
                outputFile
            ],
            {
                cwd: directory
            }
        );

        expect(JSON.parse((await readFile(outputFile)).toString()).version).not.toEqual("3.0.0");
    }, 60_000);

    it("rapiddocs generator help commands", async () => {
        // Create tmpdir and copy contents
        const tmpDir = await tmp.dir();
        const directory = AbsoluteFilePath.of(tmpDir.path);

        await cp(FIXTURES_DIR, directory, { recursive: true });

        expect(
            (
                await runRapiddocsCli(["generator", "--help"], {
                    cwd: directory,
                    reject: false
                })
            ).stdout
        ).toMatchSnapshot();

        expect(
            (
                await runRapiddocsCli(["generator", "upgrade", "--help"], {
                    cwd: directory,
                    reject: false
                })
            ).stdout
        ).toMatchSnapshot();
    }, 60_000);

    it("rapiddocs generator upgrade majors", async () => {
        // Create tmpdir and copy contents
        const tmpDir = await tmp.dir();
        const directory = AbsoluteFilePath.of(tmpDir.path);

        await cp(FIXTURES_DIR, directory, { recursive: true });

        await runRapiddocsCli(
            ["generator", "upgrade", "--group", "shouldnt-upgrade", "--generator", "rapiddocsapi/rapiddocs-python-sdk"],
            {
                cwd: directory
            }
        );

        const outputFile = join(directory, RelativeFilePath.of("version.txt"));
        await runRapiddocsCli(
            [
                "generator",
                "get",
                "--group",
                "shouldnt-upgrade",
                "--generator",
                "rapiddocsapi/rapiddocs-python-sdk",
                "--version",
                "-o",
                outputFile
            ],
            {
                cwd: directory
            }
        );

        expect(JSON.parse((await readFile(outputFile)).toString()).version).toEqual("2.16.0");

        await runRapiddocsCli(
            [
                "generator",
                "upgrade",
                "--group",
                "python-sdk",
                "--generator",
                "rapiddocsapi/rapiddocs-python-sdk",
                "--include-major"
            ],
            {
                cwd: directory
            }
        );

        const outputFileNewMajor = join(directory, RelativeFilePath.of("version-new.txt"));
        await runRapiddocsCli(
            [
                "generator",
                "get",
                "--group",
                "python-sdk",
                "--generator",
                "rapiddocsapi/rapiddocs-python-sdk",
                "--version",
                "-o",
                outputFileNewMajor
            ],
            {
                cwd: directory
            }
        );

        expect(JSON.parse((await readFile(outputFileNewMajor)).toString()).version).not.toEqual("2.16.0");
    }, 60_000);

    it("rapiddocs generator upgrade list", async () => {
        // Create tmpdir and copy contents
        const tmpDir = await tmp.dir();
        const directory = AbsoluteFilePath.of(tmpDir.path);

        await cp(FIXTURES_DIR, directory, { recursive: true });

        expect(
            (
                await runRapiddocsCli(
                    [
                        "generator",
                        "upgrade",
                        "--group",
                        "python-sdk",
                        "--generator",
                        "rapiddocsapi/rapiddocs-python-sdk",
                        "--include-major",
                        "--list"
                    ],
                    {
                        cwd: directory
                    }
                )
            ).stdout
        ).toMatchSnapshot();
    }, 60_000);

    it.skip("rapiddocs generator upgrade message", async () => {
        const tmpDir = await tmp.dir();
        const directory = AbsoluteFilePath.of(tmpDir.path);

        await cp(FIXTURES_DIR, directory, { recursive: true });

        const outputFileNewMajor = join(directory, RelativeFilePath.of("version-new.txt"));

        expect(
            (
                await runRapiddocsCli(
                    [
                        "generator",
                        "get",
                        "--group",
                        "python-sdk",
                        "--generator",
                        "rapiddocsapi/rapiddocs-python-sdk",
                        "--version",
                        "-o",
                        outputFileNewMajor
                    ],
                    {
                        cwd: directory
                    }
                )
            ).stdout
        ).toMatchSnapshot();
    }, 60_000);
});
