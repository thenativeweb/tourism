'use strict';

var path = require('path');

module.exports = function (options, use) {
  var configuration;

  if (!options.analyse || (!options.analyse.server && !options.analyse.client)) {
    use('noop');
    return;
  }

  use('grunt-eslint');

  configuration = {};

  if (options.analyse.server) {
    configuration.server = {
      src: options.analyse.server,
      options: {
        config: path.join(__dirname, 'server.json')
      }
    };
  }

  if (options.analyse.client) {
    configuration.client = {
      src: options.analyse.client,
      options: {
        config: path.join(__dirname, 'client.json')
      }
    };
  }

  /*eslint-disable consistent-return*/
  return configuration;
  /*eslint-enable consistent-return*/
};
