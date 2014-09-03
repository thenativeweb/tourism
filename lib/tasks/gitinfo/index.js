'use strict';

module.exports = function (options, use) {
  use('grunt-gitinfo');

  return {
    commands: {
      'status': [ 'status', '--porcelain' ],
      'origin-SHA': [ 'rev-parse', '--verify', 'origin' ]
    }
  };
};
