#!/usr/bin/env bash

rm -rf dist
mkdir dist
./node_modules/.bin/webpack --config=webpack.build.config.js
cp -r server example lib package.json dist/
mv dist/lib/app.min.js dist/example/app.js
mv dist/lib/app.min.js.map dist/example/app.js.map
cd dist
npm install --production
gtar -cvzf kukeze-ui.tar.gz *
scp kukeze-ui.tar.gz kukeze.com:/home/btrager/

ssh kukeze.com "rm -rf /opt/kukeze-ui/*
tar xzf ~/kukeze-ui.tar.gz -C /opt/kukeze-ui/
pm2 restart kukeze-ui
rm ~/kukeze-ui.tar.gz"