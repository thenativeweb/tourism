'use strict';

module.exports = function (options, use) {
  if (!options.coverage) {
    options.coverage = {};
  }

  if (!options.coverage.root) {
    options.coverage.root = './lib';
  }

  if (!options.coverage.check) {
    options.coverage.check = {};
  }
  if (!options.coverage.check.lines) {
    options.coverage.check.lines = 80;
  }
  if (!options.coverage.check.statements) {
    options.coverage.check.statements = 80;
  }
  if (!options.coverage.check.branches) {
    options.coverage.check.branches = 80;
  }
  if (!options.coverage.check.functions) {
    options.coverage.check.functions = 80;
  }

  use('grunt-mocha-istanbul');

  /*eslint-disable consistent-return*/
  return {
    coverage: {
      src: 'test', // the folder, not the files
      options: {
        coverage: true,
        root: options.coverage.root, // define where the cover task should consider the root of libraries that are covered by tests
        reportFormats: [ 'cobertura','lcovonly', 'html' ]
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
          check: options.coverage.check
        }
      }
    }
  };
  /*eslint-enable consistent-return*/
};
