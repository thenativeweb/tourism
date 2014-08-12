'use strict';

module.exports = function (options, use) {
  use('grunt-dev-update');

  return {
    main: {
      options: {
        updateType: 'report',
        packages: {
          dependencies: true,
          devDependencies: true
        }
      }
    }
  };
};
