'use strict';

var path = require('path');

var tourism = function (options) {
  return function (grunt) {
    var loadTask = function (name) {
      grunt.loadTasks(path.join(__dirname, '..', 'node_modules', name, 'tasks'));
    };

    var configuration = { };

    loadTask('grunt-eslint');
    configuration.eslint = {
      target: options.analyse.server,
      options: {
        config: path.join(__dirname, '..', 'configuration', 'eslint.server.json')
      }
    };

    loadTask('grunt-jscs-checker');
    configuration.jscs = {
      src: options.analyse.server,
      options: {
        config: path.join(__dirname, '..', 'configuration', 'jscs.server.json')
      }
    };

    loadTask('grunt-mocha-cli');
    configuration.mochacli = {
      options: {
        bail: true,
        harmony: true,
        reporter: 'spec',
        ui: 'tdd'
      },
      all: options.test.server
    };

    loadTask('grunt-contrib-watch');
    configuration.watch = {
      scripts: {
        files: [ '**/*.js', '!node_modules/**/*.js' ],
        tasks: [ 'default' ],
        options: {
          interrupt: true
        }
      }
    };

    loadTask('grunt-release');
    configuration.release = {
      options: {
        npm: false
      }
    };

    grunt.initConfig(configuration);

    grunt.registerTask('default', [ 'eslint', 'jscs', 'mochacli' ]);
  };
};

module.exports = tourism;
