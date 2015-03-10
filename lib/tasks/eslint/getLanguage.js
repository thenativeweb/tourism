'use strict';

var getLanguage = function (text) {
  if (!text) {
    return 'es2015';
  }

  if (text === 'latest') {
    return 'es2015';
  }

  if (text === 'es2015' || text === 'es6') {
    return 'es2015';
  }

  if (text === 'es5') {
    return 'es5';
  }

  throw new Error('Unknown language \'' + text + '\'.');
};

module.exports = getLanguage;
