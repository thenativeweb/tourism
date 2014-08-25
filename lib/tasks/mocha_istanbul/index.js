'use strict';

module.exports = function (options, use) {

  use('grunt-mocha-istanbul');

  /*eslint-disable consistent-return*/
  return {
    coverage: {
      src: 'test', // the folder, not the files,
      options: {
        mask: '*.spec.js'
      }
    },
    coveralls: {
      src: 'test', // the folder, not the files
      options: {
        coverage:true,
        check: {
          lines: 75,
          statements: 75
        },
        root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
        reportFormats: ['cobertura','lcovonly']
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
          check: {
            lines: 80,
            statements: 80
          }
        }
      }
    }
  };
  /*eslint-enable consistent-return*/
};
