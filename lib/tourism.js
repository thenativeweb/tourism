'use strict';

var configureTasks = require('./tasks/configureTasks');

var tourism = function (options) {
  return function (grunt) {
    configureTasks(options, grunt);

    grunt.registerTask('analyse', [ 'eslint', 'jscs' ]);
    grunt.registerTask('analyze', [ 'analyse' ]);
    grunt.registerTask('test', [ 'restart-mongo', 'restart-rabbit', 'mochacli' ]);
    grunt.registerTask('integrationtest', [ 'restart-mongo', 'restart-rabbit', 'shell:integrationtest' ]);
    grunt.registerTask('coverage', [ 'restart-mongo', 'restart-rabbit', 'mocha_istanbul:coverage' ]);
    grunt.registerTask('coveralls', [ 'restart-mongo', 'restart-rabbit', 'mocha_istanbul:coverage' ]);
    grunt.registerTask('outdated', [ 'devUpdate' ]);

    grunt.registerTask('publish', function (releaseType) {
      if (!releaseType) {
        releaseType = 'patch';
      }
      grunt.task.run(['test', 'integrationtest', 'release:' + releaseType);
    });

    grunt.registerTask('build', [ 'shell:build' ]);
    grunt.registerTask('start', [ 'shell:start' ]);
    grunt.registerTask('stop', [ 'shell:stop' ]);
    grunt.registerTask('restart', [ 'stop', 'start' ]);
    grunt.registerTask('status', [ 'shell:status' ]);

    grunt.registerTask('start-mongo', [ 'shell:start-mongo-docker' ]);
    grunt.registerTask('stop-mongo', [ 'shell:stop-mongo-docker' ]);
    grunt.registerTask('restart-mongo', [ 'shell:stop-mongo-docker', 'shell:start-mongo-docker' ]);
    grunt.registerTask('start-rabbit', [ 'shell:start-rabbit-docker' ]);
    grunt.registerTask('stop-rabbit', [ 'shell:stop-rabbit-docker' ]);
    grunt.registerTask('restart-rabbit', [ 'shell:stop-rabbit-docker', 'shell:start-rabbit-docker' ]);

    grunt.registerTask('update-dependencies', function (filterRegexp) {
      grunt.task.run('shell:update-dependencies:' + filterRegexp);
    });
    grunt.registerTask('update-seal', [ 'shell:update-dependencies:^seal-.*' ]);

    grunt.registerTask('default', [ 'analyse', 'test', 'outdated' ]);
  };
};

module.exports = tourism;
