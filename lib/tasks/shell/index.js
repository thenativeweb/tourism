'use strict';

var _ = require('lodash');

module.exports = function (options, use) {
  var configuration;

  if (!options.shell) {
    use('noop');
    return;
  }

  use('grunt-shell');

  configuration = {};

  _.forEach(options.shell, function (command, name) {
    configuration[name] = {
      command: command
    };
  });

  /*eslint-disable consistent-return*/
  return configuration;
  /*eslint-enable consistent-return*/
};
