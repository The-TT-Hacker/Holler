#!/bin/bash

echo "Installing frontend"
cd ./frontend
rm -rf node_modules/*
npm install

echo "Installing landing"
cd ../landing
rm -rf node_modules/*
npm install

echo "Installing api"
cd ../api
rm -rf node_modules/*
npm install
