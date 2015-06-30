'use strict';

var path = require('path');

var getLanguage = require('./getLanguage');

module.exports = function (options, use) {
  var configuration = {},
      language;

  if (!options.analyse || (!options.analyse.server && !options.analyse.client)) {
    use('noop');
    return;
  }

  use('grunt-eslint');

  if (options.analyse.server) {
    if (options.analyse.options && options.analyse.options.server) {
      language = getLanguage(options.analyse.options.server.language);
    } else {
      language = getLanguage('latest');
    }

    configuration.server = {
      src: options.analyse.server,
      options: {
        config: path.join(__dirname, language + '-server.json')
      }
    };
  }

  if (options.analyse.client) {
    if (options.analyse.options && options.analyse.options.client) {
      language = getLanguage(options.analyse.options.client.language);
    } else {
      language = getLanguage('latest');
    }

    configuration.client = {
      src: options.analyse.client,
      options: {
        config: path.join(__dirname, language + '-client.json')
      }
    };
  }

  /* eslint-disable consistent-return */
  return configuration;
  /* eslint-enable consistent-return */
};
