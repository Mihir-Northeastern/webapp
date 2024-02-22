#!/bin/bash

# Enable PostgreSQL 16
sudo dnf module enable postgresql:16 -y

# Install PostgreSQL Server
sudo dnf install postgresql-server -y

# Initialize the Database
sudo postgresql-setup --initdb

# Start PostgreSQL Service
sudo systemctl start postgresql

# Enable PostgreSQL Service to start on boot
sudo systemctl enable postgresql

sudo systemctl status postgresql
echo "Running PostgreSQL 16"

# Update pg_hba.conf for md5 authentication BEFORE restarting PostgreSQL
PG_HBA_PATH="/var/lib/pgsql/data/pg_hba.conf" # Ensure this path is correct for your installation
sudo sed -i 's/ident/trust/g' "$PG_HBA_PATH"
sudo sed -i 's/peer/trust/g' "$PG_HBA_PATH"
echo "Variable set"

# Restart PostgreSQL to apply pg_hba.conf changes
sudo systemctl restart postgresql
echo "Restart Successful"

# Set the password for the 'postgres' user. This must be done as a user with sudo privileges, not as 'postgres'.
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
echo "Password for the 'postgres' user has been set to 'postgres'."

# The following commands are now executed without sudo, as they don't require it.
# Switch to the postgres user to execute psql commands for further setup.
sudo -u postgres psql <<EOF

-- Create a new user
CREATE USER mihirmakwana WITH PASSWORD '1998';

-- Grant all permissions to the new user
ALTER USER mihirmakwana WITH SUPERUSER CREATEDB CREATEROLE REPLICATION BYPASSRLS;

-- Create a new database
CREATE DATABASE webapp OWNER mihirmakwana;

EOF

echo "PostgreSQL has been configured successfully."
