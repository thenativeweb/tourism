# tourism

tourism is a convenience wrapper for Grunt.

## Installation

At the moment, installation of this module must be made manually.

*NOTE: You only need to add tourism and `grunt` itself as dependencies to the `package.json` file. You do not have to add any plugins, tourism contains everything it needs to run internally.*

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

### Using the default task

To use tourism with the default tasks, run the following command.

    $ grunt

The `default` task will run the static code analysis, validate whitespace and execute unit tests.

### Using watch mode

To use the watch mode, run the following command.

    $ grunt watch

### Creating a release

To create a new release, run the following command.

    $ grunt release

This will upgrade the version number in the `package.json` file, create a Git tag, create a `.zip` file containing the release, commit and finally push everything to the appropriate GitHub repository.

If you want to create a minor respectively a major release, run one of the following commands instead.

    $ grunt release:minor
    $ grunt release:major

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed tourism and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt
