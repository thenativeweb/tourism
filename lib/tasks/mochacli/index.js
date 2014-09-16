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
      'async-only': true,
      bail: true,
      harmony: true,
      recursive: true,
      reporter: 'spec',
      ui: 'tdd'
    },
    all: options.test.server
  };
  /*eslint-enable consistent-return*/
};
