'use strict';

module.exports = function (options, use) {
  use('grunt-shell');

  return {
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
    'update-dependencies': {
      command: function (filterRegexp) {
        var cmd = '';
        if (filterRegexp === 'undefined' || filterRegexp === '') {
          return 'echo "No filter to match dependencies defined. Abort."';
        }
        if (filterRegexp === 'devDependencies') {
          cmd += 'echo "Updating all devDependencies"';
        } else {
          cmd += 'echo "Updating dependencies matching the following regexp: ' + filterRegexp + '"';
        }
        cmd += ' && ';
        cmd += 'node_modules/tourism/node_modules/npm-check-updates/bin/npm-check-updates -u -f "' + filterRegexp + '"';
        cmd += ' && ';
        cmd += 'npm update';
        return cmd;
      }
    },
    'start-rabbit-docker': {
      command: 'docker run -d --name rabbitmq-unittest -p 5672:5672 -p 15672:15672 mikaelhg/docker-rabbitmq'
    },
    'stop-rabbit-docker': {
      command: 'docker kill rabbitmq-unittest && docker rm rabbitmq-unittest'
    },
    'start-mongo-docker': {
      command: 'docker run -d --name mongodb-unittest -p 27017:27017 dockerfile/mongodb'
    },
    'stop-mongo-docker': {
      command: 'docker kill mongodb-unittest && docker rm mongodb-unittest'
    }
  };
};
