#!/usr/bin/env bash
./stop.sh
nohup mongod > log/mongod.log &
# nohup nodemon ~/doubleurecipe-service/server/index.js > log/server.log &
nohup nodemon ~/kukeze-ui/server/index.js > log/frontend.log &
sudo nohup proxit > log/proxit.log &
npm run dev
