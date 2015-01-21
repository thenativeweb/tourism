'use strict';

const path = require('path');

const _ = require('lodash');

const tasks = {
  devUpdate: require('./devUpdate'),
  eslint: require('./eslint'),
  mochacli: require('./mochacli'),
  /* eslint-disable camelcase */
  mocha_istanbul: require('./mocha_istanbul'),
  /* eslint-enable camelcase */
  release: require('./release'),
  shell: require('./shell'),
  watch: require('./watch')
};

const configureTasks = function (options, grunt) {
  const mergedConfiguration = {};

  _.forOwn(tasks, function (task, taskName) {
    const taskConfiguration = task(options, function (module) {
      if (module === 'noop') {
        grunt.registerTask(taskName, function () {});
        return;
      }
      grunt.loadTasks(path.join(__dirname, '..', '..', 'node_modules', module, 'tasks'));
    });

    mergedConfiguration[taskName] = taskConfiguration;
  });

  grunt.initConfig(mergedConfiguration);
};

module.exports = configureTasks;
