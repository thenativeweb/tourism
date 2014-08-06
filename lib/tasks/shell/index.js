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
    }
  };
};
