#!/bin/bash
find ./appRoot -type f -name '*.js' -exec rm -f {} \;
find ./appRoot -type f -name '*.js.msp' -exec rm -f {} \;
rm -f ./system-config.js;
rm -f ./system-config.js.map;
rm -r dist/