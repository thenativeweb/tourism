'use strict';

var path = require('path');

var tourism = function (options) {
  options.analyse = options.analyse || {};
  options.analyse.server = options.analyse.server || [];
  options.analyse.client = options.analyse.client || [];

  options.test = options.test || {};
  options.test.server = options.test.server || [];

  return function (grunt) {
    var loadTask = function (name) {
      grunt.loadTasks(path.join(__dirname, '..', 'node_modules', name, 'tasks'));
    };

    var configuration = {};

    loadTask('grunt-eslint');
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

    loadTask('grunt-jscs');
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
      }
    };

    loadTask('grunt-dev-update');
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

    loadTask('grunt-shell');
    configuration.shell = {
      build: {
        command: options.build
      },
      start: {
        command: options.start
      },
      stop: {
        command: options.stop
      },
      status: {
        command: options.status
      },
      integrationtest: {
        command: options.integrationtest
      },
      update: {
        command: 'node_modules/npm-check-updates/bin/npm-check-updates -u -f "^seal-.*"'
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
    grunt.registerTask('status', [ 'shell:status' ]);
    grunt.registerTask('integrationtest', [ 'shell:integrationtest' ]);
    grunt.registerTask('update', [ 'shell:update' ]);
    grunt.registerTask('restart', [ 'stop', 'start' ]);

    grunt.registerTask('default', [ 'analyse', 'test', 'outdated' ]);
  };
};

module.exports = tourism;
