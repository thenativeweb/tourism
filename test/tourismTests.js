'use strict';

var assert = require('node-assertthat');

var tourism = require('../lib/tourism');

suite('tourism', function () {
  test('is a function.', function (done) {
    assert.that(tourism, is.ofType('function'));
    done();
  });
});
