# tourism

tourism is a convenience wrapper for Grunt.

## Installation

    $ npm install tourism

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

The `default` task will run the static code analysis, validate whitespace, execute unit tests and check for outdated packages.

### Running the default task partially

If you only want to run the default task partially, there are a number of commands you may use:

    $ grunt analyse
    $ grunt test
    $ grunt outdated

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

### Creating a build

If you want to build your application or clean a previous build using a command-line call, specify the `build` and / or `clean` option and provide a shell script in the `Gruntfile.js`.

```javascript
'use strict';

var tourism = require('tourism');

module.exports = tourism({
  build: '...',
  clean: '...'
});
```

Then call one of the following commands.

    $ grunt build
    $ grunt clean

Basically, a rebuild is the same as cleaning and building again, hence you can do a rebuild using the following command.

    $ grunt rebuild

### Starting, stopping and restarting the application

If you want to start or stop your application using a command-line call, specify the `start` and / or `stop` option and provide a shell script in the `Gruntfile.js`.

```javascript
'use strict';

var tourism = require('tourism');

module.exports = tourism({
  start: '...',
  stop: '...'
});
```

Then call one of the following commands.

    $ grunt start
    $ grunt stop

Basically, a restart is the same as stopping and starting again, hence you can do a restart using the following command.

    $ grunt restart

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed tourism and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2014 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
