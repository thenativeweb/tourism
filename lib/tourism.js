'use strict';

var path = require('path');

var tourism = function (options) {
  options.analyse = options.analyse || {};
  options.analyse.server = options.analyse.server || [];
  options.analyse.client = options.analyse.client || [];

  options.test = options.test || {};
  options.test.server = options.test.server || [];

  return function (grunt) {
    require('load-grunt-tasks')(grunt, { config: path.join(__dirname, '..', 'package.json') });

    var configuration = {};

    configuration.eslint = {
      server: {
        src: options.analyse.server,
        options: {
          config: path.join(__dirname, '..', 'configuration', 'eslint.server.json')
        }
      },
      client: {
        src: options.analyse.client,
        options: {
          config: path.join(__dirname, '..', 'configuration', 'eslint.client.json')
        }
      }
    };

    configuration.jscs = {
      server: {
        src: options.analyse.server,
        options: {
          config: path.join(__dirname, '..', 'configuration', 'jscs.server.json')
        }
      },
      client: {
        src: options.analyse.client,
        options: {
          config: path.join(__dirname, '..', 'configuration', 'jscs.client.json')
        }
      }
    };

    configuration.mochacli = {
      options: {
        bail: true,
        harmony: true,
        reporter: 'spec',
        ui: 'tdd'
      },
      all: options.test.server
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

    configuration.release = {
      options: {
        npm: false
      }
    };

    configuration.devUpdate = {
      main: {
        options: {
          updateType: 'report',
          packages: {
            dependencies: true,
            devDependencies: true
          }
        }
      }
    };

    configuration.shell = {
      build: {
        command: options.build
      },
      start: {
        command: options.start
      },
      stop: {
        command: options.stop
      }
    };

    grunt.initConfig(configuration);

    grunt.registerTask('analyse', [ 'eslint', 'jscs' ]);
    grunt.registerTask('analyze', [ 'analyse' ]);
    grunt.registerTask('test', [ 'mochacli' ]);

    grunt.registerTask('outdated', [ 'devUpdate' ]);

    grunt.registerTask('build', [ 'shell:build' ]);
    grunt.registerTask('start', [ 'shell:start' ]);
    grunt.registerTask('stop', [ 'shell:stop' ]);
    grunt.registerTask('restart', [ 'stop', 'start' ]);

    grunt.registerTask('default', [ 'analyse', 'test', 'outdated' ]);
  };
};

module.exports = tourism;
