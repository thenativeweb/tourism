'use strict';

const _ = require('lodash');

module.exports = function (options, use) {
  use('grunt-shell');

  const configuration = {};

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
  if (!configuration['show-coverage']) {
    configuration['show-coverage'] = {
      command: 'open coverage/index.html'
    };
  }
  if (!configuration.update) {
    configuration.update = {
      command: function (pattern) {
        if (pattern === '*') {
          return 'rm -rf node_modules && npm install';
        }

        return 'rm -rf node_modules/' + pattern + ' && npm install';
      }
    };
  }

  /*eslint-disable consistent-return*/
  return configuration;
  /*eslint-enable consistent-return*/
};
