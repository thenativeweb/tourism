'use strict';

var _ = require('lodash');

module.exports = function (options, use) {
  var configuration;

  use('grunt-shell');

  configuration = {};

  _.forEach(options.shell, function (command, name) {
    configuration[name] = {
      command: command
    };
  });

  if (!configuration.start) {
    configuration.start = {
      command: 'node app.js'
    };
  }
  if (!configuration.install) {
    configuration.install = {
      command: 'rm -rf node_modules && npm install'
    };
  }

  /*eslint-disable consistent-return*/
  return configuration;
  /*eslint-enable consistent-return*/
};
