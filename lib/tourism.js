'use strict';

var configureTasks = require('./tasks/configureTasks');

var tourism = function (options) {
  return function (grunt) {
    configureTasks(options, grunt);

    grunt.registerTask('analyse', [ 'eslint', 'jscs' ]);
    grunt.registerTask('analyze', [ 'analyse' ]);
    grunt.registerTask('test', [ 'mochacli' ]);
    grunt.registerTask('outdated', [ 'devUpdate' ]);

    grunt.registerTask('build', [ 'shell:build' ]);
    grunt.registerTask('clean', [ 'shell:clean' ]);
    grunt.registerTask('rebuild', [ 'clean', 'build' ]);

    grunt.registerTask('start', [ 'shell:start' ]);
    grunt.registerTask('stop', [ 'shell:stop' ]);
    grunt.registerTask('restart', [ 'stop', 'start' ]);

    grunt.registerTask('default', [ 'analyse', 'test', 'outdated' ]);
  };
};

module.exports = tourism;
