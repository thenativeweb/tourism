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

Please note that in the `package.json` file you only need to add tourism and `grunt` itself as a dependency. You do **not** have to add any plugins, tourism takes care of that automatically.

## Running the tests

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, Grunt also analyses the code. To run Grunt, go to the folder where you have installed tourism and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt
