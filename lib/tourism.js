'use strict';

var path = require('path');

var tourism = function (options) {
  return function (grunt) {
    var configuration = {};

    configuration.jshint = {
      files: options.analyse.server,
      options: {
        jshintrc: path.join(__dirname, '..', 'configuration', 'jshint.server.json')
      }
    };

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

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
  };
};

module.exports = tourism;
