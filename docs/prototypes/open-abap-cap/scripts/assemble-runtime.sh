#!/usr/bin/env sh
# Fill runtime/ from an upstream checkout that has been downported and
# transpiled - the three directories @abap2ui5/runtime would contain.
#
#   git clone https://github.com/abap2UI5/abap2UI5 /tmp/ref && cd /tmp/ref
#   npm ci && npm run deps && npm run auto_downport && npm run auto_transpile
#   scripts/assemble-runtime.sh /tmp/ref
#
# Build in a SCRATCH COPY: auto_downport rewrites src/ in place.
set -eu
REF=${1:?usage: assemble-runtime.sh <upstream checkout>}
HERE=$(cd "$(dirname "$0")/.." && pwd)
for d in node/output/init.mjs node/setup/setup.mjs app/webapp/index.html; do
  test -f "$REF/$d" || { echo "missing $REF/$d - run npm run auto_downport && npm run auto_transpile there" >&2; exit 1; }
done
rm -rf "$HERE/runtime/output" "$HERE/runtime/setup" "$HERE/runtime/webapp"
cp -r "$REF/node/output" "$HERE/runtime/output"
mkdir -p "$HERE/runtime/setup" && cp "$REF/node/setup/setup.mjs" "$HERE/runtime/setup/"
cp -r "$REF/app/webapp" "$HERE/runtime/webapp"
echo "runtime/ assembled from $REF ($(ls "$HERE/runtime/output" | wc -l) transpiled files)"
