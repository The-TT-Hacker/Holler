#!/bin/bash

./scripts/run_back.sh &
sleep 0.1
./scripts/run_landing.sh &
sleep 0.1
./scripts/run_front.sh
kill %1
