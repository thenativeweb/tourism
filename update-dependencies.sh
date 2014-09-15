#!/bin/bash

filterRegexp=$1

# Run npm update only if new versions found
node_modules/npm-check-updates/bin/npm-check-updates -u -f $filterRegexp | tee >(grep -q "All dependencies match the latest package versions :)" || npm update)
