'use strict';

var path = require('path');

var tourism = function (options) {
  return function (grunt) {
    var configuration = { };

    grunt.loadTasks(path.join(__dirname, '..', 'node_modules', 'grunt-eslint'));
    configuration.eslint = {
      target: options.analyse.server,
      options: {
        config: path.join(__dirname, '..', 'configuration', 'eslint.server.json')
      }
    };

    grunt.loadTasks(path.join(__dirname, '..', 'node_modules', 'grunt-jscs-checker'));
    configuration.jscs = {
      src: options.analyse.server,
      options: {
        config: path.join(__dirname, '..', 'configuration', 'jscs.server.json')
      }
    };

    grunt.loadTasks(path.join(__dirname, '..', 'node_modules', 'grunt-mocha-test'));
    configuration.mochaTest = {
      test: {
        options: {
          bail: true,
          reporter: 'spec',
          ui: 'tdd'
        },
        src: options.test.server
      }
    };

    grunt.loadTasks(path.join(__dirname, '..', 'node_modules', 'grunt-contrib-watch'));
    configuration.watch = {
      scripts: {
        files: [ '**/*.js', '!node_modules/**/*.js' ],
        tasks: [ 'default' ],
        options: {
          interrupt: true
        }
      }
    };

    grunt.initConfig(configuration);

    grunt.registerTask('default', [ 'eslint', 'jscs', 'mochaTest' ]);
  };
};

module.exports = tourism;
