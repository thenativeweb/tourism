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

### Changing the language version for code analysis

By default, code analysis uses rules that target the latest version of EcmaScript. If you want to change this, you can provide an additional `options` object and change the language version. Currently supported values are `es5`, `es6`, `es2015` (which is equivalent to `es6`) and `latest` (which is the default).

```javascript
module.exports = tourism({
  analyse: {
    server: [ '**/*.js', '!node_modules/**/*.js' ],
    options: {
      server: {
        language: 'es5'
      }
    }
  }
});
```

### Calculating test coverage

To calculate the test coverage run the following command.

    $ grunt report

The command stores the results in the `coverage` directory. Additionally, it opens a graphical overview within your web browser. If you only want to calculate the results without actually showing them, run the following command alternatively.

    $ grunt coverage

Then, you need to open the file `index.html` from the directory `coverage` manually.

Additionally, tourism adds the file `cobertura-coverage.xml` to the `coverage` directory, so that you are able to integrate calculating the test coverage into your automated build.

### Verifying licenses

If you want to verify that the licenses of your dependencies are compatible to your requirements, add the list of allowed licenses to your configuration.

```javascript
module.exports = tourism({
  licenses: [ 'MIT', 'BSD' ]
});
```

### Running the default task partially

If you only want to run the default task partially, there are a number of commands you may use:

    $ grunt analyse
    $ grunt test
    $ grunt outdated
    $ grunt licenses

### Using watch mode

To use the watch mode, run the following command.

    $ grunt watch

### Creating a release

To create a new release, run the following command.

    $ grunt publish

This will upgrade the version number in the `package.json` file, create a Git tag, create a `.zip` file containing the release, commit and finally push everything to the appropriate GitHub repository.

If you want to create a minor respectively a major release, run one of the following commands instead.

    $ grunt publish:minor
    $ grunt publish:major

If, for whatever reason, you need to skip code analysis and test execution before publishing, use `grunt release` instead of `grunt publish`.

### Using shell tasks

Additionally to the previous tasks most often you need a number of shell commands, e.g. to start an application or to install dependencies. For that you can register named commands using the `shell` object.

```javascript
module.exports = tourism({
  // ...
  shell: {
    start: 'echo "Hello world!"'
  }
});
```

If you need to run a parametrized shell task, provide a function instead of a string.

```javascript
module.exports = tourism({
  // ...
  shell: {
    start: function (message) {
      return 'echo "' + message + '"';
    }
  }
});
```

#### Using built-in shell commands

Unless you overwrite them by your own version, tourism comes with a number of built-in shell commands. To start your Node.js application using `node app.js` run the following command.

    $ grunt start

To update your dependencies you can use the `update` task. If you do not specify a module to update, all modules will be updated. Otherwise, only the specified one will be updated.

    $ grunt update
    $ grunt update:lodash

Additionally, there are two commands that get registered depending on whether other commands have been registered.

- If you register a `start` and a `stop` command, but no `restart` command, `stop && start` is registered.
- If you register a `build` and a `clean` command, but no `rebuild` command, `clean && build` is registered.

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed tourism and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2014-2015 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
