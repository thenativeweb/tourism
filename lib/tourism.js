'use strict';

var path = require('path');

var tourism = function (options) {
  return function (grunt) {
    var configuration = { };

    grunt.loadNpmTasks('grunt-eslint');
    configuration.eslint = {
      target: options.analyse.server,
      options: {
        config: path.join(__dirname, '..', 'configuration', 'eslint.server.json')
      }
    };

    grunt.loadNpmTasks('grunt-mocha-test');
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

    grunt.loadNpmTasks('grunt-contrib-watch');
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

    grunt.registerTask('default', [ 'eslint', 'mochaTest' ]);
  };
};

module.exports = tourism;
