'use strict';

module.exports = function (options, use) {
  use('grunt-contrib-watch');

  return {
    scripts: {
      files: [ '**/*.js', '!node_modules/**/*.js' ],
      tasks: [ 'default' ],
      options: {
        interrupt: true
      }
    }
  };
};
