#!/bin/bash

VERSION_TYPE=${1:-patch}

if [[ ! "$VERSION_TYPE" =~ ^(major|minor|patch|premajor|preminor|prepatch|prerelease)$ ]]; then
    echo "Error: Invalid version type '$VERSION_TYPE'. Must be one of: major, minor, patch, premajor, preminor, prepatch, prerelease"
    exit 1
fi

OLD_VERSION=$(git show HEAD:package.json | grep '"version"' | sed -E 's/.*"version": "(.*)".*/\1/')

pnpm version "$VERSION_TYPE" -m "chore: bump $VERSION_TYPE version (from $OLD_VERSION)"

if [ $? -eq 0 ]; then
    NEW_VERSION=$(grep '"version"' package.json | sed -E 's/.*"version": "(.*)".*/\1/')
    echo "Version bumped from $OLD_VERSION to $NEW_VERSION ($VERSION_TYPE)"
fi
