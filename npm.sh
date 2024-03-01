#!/bin/bash

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

mkdir csye6225
sudo chown -R csye6225:csye6225 /opt/csye6225/
sudo chmod -R 755 /opt/csye6225/

sudo cp /tmp/webapp.zip /opt/csye6225/webapp.zip

sudo su - csye6225
cd /opt/csye6225 || exit
sudo unzip webapp.zip
cd webapp/ || exit

sudo npm install

sudo cp /tmp/csye.service /etc/systemd/system/csye.service

sudo systemctl daemon-reload
sudo systemctl enable csye
sudo systemctl start csye
sudo systemctl status csye