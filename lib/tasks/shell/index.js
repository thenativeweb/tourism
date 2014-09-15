'use strict';

module.exports = function (options, use) {
  use('grunt-shell');

  return {
    build: {
      command: function () {
        return options.build || 'echo "No build command defined."';
      }
    },
    start: {
      command: function () {
        return options.start || 'echo "No start command defined."';
      }
    },
    stop: {
      command: function () {
        return options.stop || 'echo "No stop command defined."';
      }
    },
    status: {
      command: function () {
        return options.status || 'echo "No status command defined."';
      }
    },
    integrationtest: {
      command: function () {
        return options.integrationtest || 'echo "No integration test defined."';
      }
    },
    coverage: {
      command: 'istanbul cover node_modules/tourism/node_modules/grunt-mocha-cli/node_modules/.bin/_mocha -- -R spec'
    },
    'update-dependencies': {
      command: function (filterRegexp) {
        var cmd = '';
        if (filterRegexp === 'undefined' || filterRegexp === '') {
          return 'echo "No filter to match dependencies defined. Abort."';
        }
        if (filterRegexp === 'devDependencies') {
          cmd += 'echo "Update all devDependencies"';
        } else {
          cmd += 'echo "Update dependencies matching the following regexp: ' + filterRegexp + '"';
        }
        cmd += ' && node_modules/tourism/update-dependencies.sh "' + filterRegexp + '"';
        //cmd += ' && bash update-dependencies.sh "' + filterRegexp + '"';
        return cmd;
      }
    },
    'start-rabbit-docker': {
      command: 'docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 mikaelhg/docker-rabbitmq'
    },
    'stop-rabbit-docker': {
      command: 'docker kill rabbitmq && docker rm rabbitmq'
    },
    'start-mongo-docker': {
      command: 'docker run -d --name mongodb -p 27017:27017 dockerfile/mongodb'
    },
    'stop-mongo-docker': {
      command: 'docker kill mongodb && docker rm mongodb'
    },
    gitfetch: {
      command: 'git fetch'
    }
  };
};
