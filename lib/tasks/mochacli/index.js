'use strict';

module.exports = function (options, use) {
  if (!options.test || !options.test.server) {
    use('noop');
    return;
  }

  use('grunt-mocha-cli');

  /*eslint-disable consistent-return*/
  return {
    options: {
      bail: true,
      harmony: true,
      reporter: 'spec',
      ui: 'tdd'
    },
    all: options.test.server
  };
  /*eslint-enable consistent-return*/
};
