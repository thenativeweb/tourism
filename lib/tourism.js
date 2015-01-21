'use strict';

const _ = require('lodash');

const configureTasks = require('./tasks/configureTasks');

const tourism = function (options) {
  return function (grunt) {
    options.shell = options.shell || {};

    configureTasks(options, grunt);

    grunt.registerTask('analyse', [ 'eslint' ]);
    grunt.registerTask('analyze', [ 'analyse' ]);
    grunt.registerTask('test', [ 'mochacli' ]);
    grunt.registerTask('coverage', [ 'mocha_istanbul:coverage' ]);
    grunt.registerTask('report', [ 'coverage', 'shell:show-coverage' ]);
    grunt.registerTask('outdated', [ 'devUpdate' ]);

    grunt.registerTask('publish', function (releaseType) {
      grunt.task.run([ 'default', 'release:' + (releaseType || 'patch') ]);
    });

    _.forEach(options.shell, function (command, name) {
      if (typeof command === 'function') {
        grunt.registerTask(name, function (arg) {
          grunt.task.run([ 'shell:' + name + ':' + arg ]);
        });
        return;
      }
      grunt.registerTask(name, [ 'shell:' + name ]);
    });

    if (!options.shell.update) {
      grunt.registerTask('update', function (pattern) {
        grunt.task.run([ 'shell:update:' + (pattern || '*') ]);
      });
    }

    if (!options.shell.start) {
      grunt.registerTask('start', [ 'shell:start' ]);
    }
    if (options.shell.stop && options.shell.start && !options.shell.restart) {
      grunt.registerTask('restart', [ 'stop', 'start' ]);
    }
    if (options.shell.clean && options.shell.build && !options.shell.rebuild) {
      grunt.registerTask('rebuild', [ 'clean', 'build' ]);
    }

    grunt.registerTask('default', [ 'analyse', 'test', 'outdated' ]);
  };
};

module.exports = tourism;
