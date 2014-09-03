'use strict';

var configureTasks = require('./tasks/configureTasks');

var tourism = function (options) {
  return function (grunt) {
    configureTasks(options, grunt);

    // Default task

    grunt.registerTask('default', [ 'test', 'analyse', 'outdated' ]);

    // Check formatting

    grunt.registerTask('analyse', [ 'eslint', 'jscs' ]);
    grunt.registerTask('analyze', [ 'analyse' ]);

    // Run tests

    grunt.registerTask('test', [ 'restart-mongo', 'restart-rabbit', 'mochacli' ]);
    grunt.registerTask('integrationtest', [ 'restart-mongo', 'restart-rabbit', 'shell:integrationtest' ]);
    grunt.registerTask('coverage', [ 'restart-mongo', 'restart-rabbit', 'mocha_istanbul:coverage' ]);
    grunt.registerTask('coveralls', [ 'restart-mongo', 'restart-rabbit', 'mocha_istanbul:coverage' ]);

    // Check version of dependencies

    grunt.registerTask('outdated', [ 'devUpdate' ]);

    // Test and release

    grunt.registerTask('publish', function (releaseType) {
      if (!releaseType) {
        releaseType = 'patch';
      }
      grunt.task.run([ 'check-repo', 'test', 'integrationtest', 'release:' + releaseType ]);
    });

    // These commands must be defined in Gruntfile.js

    grunt.registerTask('build', [ 'shell:build' ]);
    grunt.registerTask('start', [ 'shell:start' ]);
    grunt.registerTask('stop', [ 'shell:stop' ]);
    grunt.registerTask('restart', [ 'stop', 'start' ]);
    grunt.registerTask('status', [ 'shell:status' ]);

    // Handle docker container for MongoDB and RabbitMQ

    grunt.registerTask('start-mongo', [ 'shell:start-mongo-docker' ]);
    grunt.registerTask('stop-mongo', [ 'shell:stop-mongo-docker' ]);
    // Note: stop-mongo-docker fails if container is not running, so the force
    // option must be set for this task.
    grunt.registerTask('restart-mongo', [ 'set-force-option', 'shell:stop-mongo-docker',
      'restore-force-option', 'shell:start-mongo-docker' ]);
    grunt.registerTask('start-rabbit', [ 'shell:start-rabbit-docker' ]);
    grunt.registerTask('stop-rabbit', [ 'shell:stop-rabbit-docker' ]);
    // Note: stop-mongo-docker fails if container is not running, so the force
    // option must be set for this task.
    grunt.registerTask('restart-rabbit', [ 'set-force-option', 'shell:stop-rabbit-docker',
      'restore-force-option', 'shell:start-rabbit-docker' ]);

    // Update package.json

    grunt.registerTask('update-dependencies', function (filterRegexp) {
      grunt.task.run('shell:update-dependencies:' + filterRegexp);
    });
    grunt.registerTask('update-seal', [ 'shell:update-dependencies:^seal-.*' ]);

    // Check for clean repository (no uncommitted changes, on specified branch, in sync with origin)

    grunt.registerTask('check-repo', function (branch) {
      if (!branch) {
        branch = 'master';
      }
      grunt.task.run([ 'gitinfo', 'check-branch:' + branch, 'check-no-uncommitted-changes',
        'shell:gitfetch', 'check-repo-in-sync'
      ]);
    });
    grunt.registerTask('check-branch', 'Check we are on required git branch', function(requiredBranch) {
      grunt.task.requires('gitinfo');

      if (arguments.length === 0) {
        requiredBranch = 'master';
      }

      var currentBranch = grunt.config('gitinfo.local.branch.current.name');

      if (currentBranch !== requiredBranch) {
        grunt.log.error('Current branch is ' + currentBranch + ' - must be on branch ' + requiredBranch);
        return false;
      }
    });
    grunt.registerTask('check-no-uncommitted-changes', 'Check there are no uncommitted changes', function() {
      grunt.task.requires('gitinfo');

      var status = grunt.config('gitinfo.status');

      if (status !== '') {
        grunt.log.error('There are uncommitted local modifications.');
        return false;
      }
    });
    grunt.registerTask('check-repo-in-sync', 'Check code is in sync with remote repo', function() {
      grunt.task.requires('gitinfo');
      grunt.task.requires('shell:gitfetch');

      var localSha = grunt.config('gitinfo.local.branch.current.SHA');
      var originSha = grunt.config('gitinfo.origin-SHA');

      if (localSha !== originSha) {
        grunt.log.error('Your local branch is not in sync with origin.');
        return false;
      }
    });

    // Helper tasks to let grunt continue even if an error occurs in a task

    grunt.registerTask('set-force-option', 'set option "force" to true', function() {
      grunt.config.set('origForceOptionValue', grunt.option('force'));
      grunt.option('force', true);
    });
    grunt.registerTask('restore-force-option',
    'reset option "force" to its original value', function() {
      grunt.option('force', grunt.option('origForceOptionValue'));
    });
  };
};

module.exports = tourism;
