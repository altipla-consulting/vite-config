#!/bin/bash

set -eu

. /opt/ci-toolset/functions.sh

run "npm ci"
run "npm run lint"
run "npm test"
