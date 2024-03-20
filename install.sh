#!/bin/bash

sudo dnf update -y
sudo dnf clean all -y
sudo dnf install nano -y
sudo dnf install lsof -y
sudo groupadd csye6225
sudo useradd -g csye6225 -s /usr/sbin/nologin csye6225
sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y
sudo dnf install npm unzip -y
sudo mkdir -p /opt/csye6225/
sudo mkdir -p /var/log/webapplogs/
sudo mv /tmp/webapp.zip /opt/csye6225/
cd /opt/csye6225/ || exit
pwd
sudo unzip webapp.zip -d webapp
cd webapp || exit
sudo npm install

sudo cp /tmp/csye.service /etc/systemd/system/csye.service
sudo chown -R csye6225:csye6225 /opt/csye6225/
sudo chmod -R 750 /opt/csye6225/
sudo chown -R csye6225:csye6225 /var/log/webapplogs/
sudo chmod -R 775 /var/log/webapplogs/
