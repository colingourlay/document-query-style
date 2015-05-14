#!/bin/bash

if [ $# -gt 0 ] && [ ! -d "examples/$1" ]; then
	echo -e "Example '$1' not found.\n"
fi

if [ $# -eq 0 ] || [ ! -d "examples/$1" ]; then
	echo -e "Please call this script with an example names:\n"
	cd examples/ > /dev/null
	ls -d */ | sed 's/\///' | sed 's/^/ \* /'
	cd - > /dev/null
	echo -e "\ne.g.\n\n $ npm run example basic"
	exit
fi

echo -e "Running example '$1'...\n"

node_modules/.bin/beefy examples/$1/index.js --index=examples/$1/index.html