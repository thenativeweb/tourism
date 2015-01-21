'use strict';

const tourism = require('./lib/tourism');

module.exports = tourism({
  analyse: {
    server: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js' ]
  },
  test: {
    server: [ 'test/**/*.js' ]
  }
});
