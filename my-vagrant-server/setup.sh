#!/bin/bash
echo "Updating system packages..."
sudo apt-get update -y

echo "Installing Nginx..."
sudo apt-get install -y nginx

echo "Installing MySQL..."
sudo apt-get install -y mysql-server

echo "Setup Complete! Visit http://localhost:8080"