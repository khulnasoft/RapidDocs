#!/usr/bin/env sh

set -e

cli_path="$1"
token="$2"

test_dir="$(mktemp -d)"
cd "$test_dir"

export RAPIDDOCS_TOKEN="$token"

echo "Running Rapiddocs Commands!"
set -x
node "$cli_path" init --organization rapiddocs
node "$cli_path" add rapiddocs-java-sdk
node "$cli_path" add rapiddocs-python-sdk
node "$cli_path" add rapiddocs-postman
node "$cli_path" generate --log-level debug
set +x
node "$cli_path" register --log-level debug

rm -rf "$test_dir"
