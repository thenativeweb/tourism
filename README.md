# tourism

tourism is a convenience wrapper for Grunt.

## Installation

At the moment, installation of this module must be made manually.

## Quick Start

First you need to create a file called `Gruntfile.js`. Then, instead of the usual content, use the following lines of code to enable code analysis and execution of unit tests.

```javascript
'use strict';

var tourism = require('tourism');

module.exports = tourism({
  analyse: {
    server: [ '**/*.js', '!node_modules/**/*.js' ]
  },
  test: {
    server: [ 'test/**/*.js' ]
  }
});
```

## Running the tests

tourism has been developed using TDD. To run the tests, go to the folder where you have installed tourism to and run `npm test`. You need to have [mocha](https://github.com/visionmedia/mocha) installed.

    $ npm test

Additionally, this module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, Grunt also analyses the code using [JSHint](http://www.jshint.com/). To run Grunt, go to the folder where you have installed tourism and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt
