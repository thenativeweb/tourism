'use strict';

module.exports = function (options, use) {
  if (!options.licenses) {
    use('noop');
    return;
  }

  use('grunt-licensechecker');

  /*eslint-disable consistent-return*/
  return {
    options: {
      warn: true,
      outFile: null,
      acceptable: options.licenses,
      include: 'all'
    }
  };
  /*eslint-enable consistent-return*/
};
