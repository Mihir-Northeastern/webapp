#!/bin/bash

# Unzip the file
unzip /tmp/webapp.zip -d /tmp

# Navigate to the directory
cd /tmp/webapp

# Install npm packages
npm install

echo "Script execution completed."