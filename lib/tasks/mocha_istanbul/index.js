'use strict';

module.exports = function (options, use) {
  if (!options.test || !options.test.server) {
    use('noop');
    return;
  }

  use('grunt-mocha-istanbul');

  /*eslint-disable consistent-return*/
  return {
    coverage: {
      src: options.test.server,
      options: {
        mochaOptions: [ '--bail', '--harmony' ],
        print: 'summary',
        recursive: true,
        reportFormats: [ 'html' ],
        ui: 'tdd'
      }
    }
  };
  /*eslint-enable consistent-return*/
};
