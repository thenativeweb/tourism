'use strict';

var _ = require('lodash');

var configureTasks = require('./tasks/configureTasks');

var tourism = function (options) {
  return function (grunt) {
    options.shell = options.shell || {};

    configureTasks(options, grunt);

    grunt.registerTask('analyse', [ 'eslint' ]);
    grunt.registerTask('analyze', [ 'analyse' ]);
    grunt.registerTask('test', [ 'mochacli' ]);
    grunt.registerTask('coverage', [ 'mocha_istanbul:coverage' ]);
    grunt.registerTask('report', [ 'coverage', 'shell:show-coverage' ]);
    grunt.registerTask('licenses', [ 'licensechecker' ]);
    grunt.registerTask('license', [ 'licenses' ]);
    grunt.registerTask('outdated', [ 'depcheck', 'devUpdate' ]);

    grunt.registerTask('publish', function (releaseType) {
      grunt.task.run([ 'checkbranch', 'checkpending', 'gitnobehind', 'default', 'release:' + (releaseType || 'patch') ]);
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
        grunt.task.run([ 'shell:update:' + (pattern || '*'), 'default' ]);
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

    grunt.registerTask('default', [ 'analyse', 'test', 'outdated', 'license' ]);
  };
};

module.exports = tourism;
