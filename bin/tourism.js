#!/usr/bin/env node
'use strict';

var childProcess = require('child_process'),
    path = require('path');

var updateNotifier = require('update-notifier');

var packageJson = require('../package.json');

var grunt = path.join(__dirname, '..', 'node_modules', '.bin', 'grunt');

updateNotifier({
  packageName: packageJson.name,
  packageVersion: packageJson.version
}).notify();

childProcess.spawn(grunt, process.argv.splice(2), {
  cwd: process.cwd(),
  stdio: 'inherit'
});
