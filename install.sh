#!/bin/bash

# Clean the DNF cache
sudo dnf clean all -y

# Update all packages
sudo dnf update -y

# Install Zip
sudo dnf install unzip -y

# Reset the Node.js module
sudo dnf module reset nodejs -y

# Enable a specific version of Node.js module
sudo dnf module enable nodejs:20 -y

# Install the enabled Node.js module
sudo dnf module install nodejs:20 -y

# Install nano text editor
sudo dnf install nano -y

echo "Script execution completed."
