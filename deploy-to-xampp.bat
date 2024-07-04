#!/bin/bash

# Variables
GITHUB_REPO="kaylaajanee/whatsapp-clone"
ARTIFACT_NAME="production-files"
XAMPP_HTDOCS_PATH="C:\xampp\htdocs"

# Download the latest artifact from GitHub
curl -L -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token YOUR_GITHUB_TOKEN" \
    https://api.github.com/repos/$GITHUB_REPO/actions/artifacts | jq -r '.artifacts[0].archive_download_url' | xargs curl -L -o artifact.zip

# Unzip the artifact
unzip artifact.zip -d build

# Remove existing files in XAMPP htdocs directory
rm -rf $XAMPP_HTDOCS_PATH/*

# Copy new build files to XAMPP htdocs directory
cp -r build/* $XAMPP_HTDOCS_PATH/

# Cleanup
rm -rf build artifact.zip
