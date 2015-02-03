'use strict';

var path = require('path');

var _ = require('lodash');

var tasks = {
  checkbranch: require('./checkbranch'),
  checkpending: require('./checkpending'),
  depcheck: require('./depcheck'),
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

var configureTasks = function (options, grunt) {
  var mergedConfiguration = {};

  _.forOwn(tasks, function (task, taskName) {
    var taskConfiguration = task(options, function (module) {
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
