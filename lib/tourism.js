'use strict';

var _ = require('lodash');

var configureTasks = require('./tasks/configureTasks');

var tourism = function (options) {
  return function (grunt) {
    configureTasks(options, grunt);

    grunt.registerTask('analyse', [ 'eslint' ]);
    grunt.registerTask('analyze', [ 'analyse' ]);
    grunt.registerTask('test', [ 'mochacli' ]);
    grunt.registerTask('outdated', [ 'devUpdate' ]);

    if (options.shell) {
      _.forEach(options.shell, function (command, name) {
        grunt.registerTask(name, [ 'shell:' + name ]);
      });

      if (options.shell.stop && options.shell.start) {
        grunt.registerTask('restart', [ 'stop', 'start' ]);
      }

      if (options.shell.clean && options.shell.build) {
        grunt.registerTask('rebuild', [ 'clean', 'build' ]);
      }
    }

    grunt.registerTask('default', [ 'analyse', 'test', 'outdated' ]);
  };
};

module.exports = tourism;
