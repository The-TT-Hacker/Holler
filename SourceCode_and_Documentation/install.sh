#!/bin/bash

echo "Installing frontend"
cd ./frontend
npm install

echo "Installing landing"
cd ../landing
npm install

echo "Installing api"
cd ../api
npm install
