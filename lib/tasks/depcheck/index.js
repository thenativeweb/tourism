'use strict';

module.exports = function (options, use) {
  use('grunt-depcheck');

  return {
    options: {
      withoutDev: false,
      ignoreMatches: [ 'grunt' ]
    },
    files: {
      src: [ '.' ]
    }
  };
};
