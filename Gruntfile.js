'use strict';

var tourism = require('./lib/tourism');

module.exports = tourism({
  analyse: {
    server: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**' ]
  },
  test: {
    server: [ 'test/**/*.js' ]
  }
});
