tolars.js
=========

[![CircleCI](https://circleci.com/gh/runningbeta/tolars.js/tree/master.svg?style=svg)](https://circleci.com/gh/runningbeta/tolars.js/tree/master)
[![codecov](https://codecov.io/gh/runningbeta/tolars.js/branch/master/graph/badge.svg)](https://codecov.io/gh/runningbeta/tolars.js)
[![devDependencies Status](https://david-dm.org/runningbeta/tolars.js/dev-status.svg)](https://david-dm.org/runningbeta/tolars.js?type=dev)
[![License: MIT](https://img.shields.io/badge/License-Apache2-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Tolar utilities in JavaScript (and TypeScript).

Features
--------

- Tiny
- Extensive documentation
- Large collection of **test cases** which are maintained and added to
- **[Apache 2 License](./LICENSE)**; completely open source to do with as you please

Installing
----------

To use in [node.js](https://nodejs.org/):

```bash
/> npm install --save tolars
```

Documentation
-------------

### Usage

Import the library in your code:

```js
const tolars = require('tolars');
// or ES6 style
import tolars from 'tolars';
```

### API

// TODO: Document API methods

Commands
--------
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run lint:fix` - Run ESlint with airbnb-config and fix issues
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

Library development features
----------------------------

- **ES6/ESNext** - Write _ES6_ code and _Babel_ will transpile it to ES5 for backwards compatibility
- **Test** - _Mocha_ with _Istanbul_ coverage
- **Lint** - Preconfigured _ESlint_ with _Airbnb_ config
- **CI** - _CircleCI_ configuration setup
- **Minify** - Built code will be minified for performance

License
-------

This project is open source and distributed under the [Apache License Version 2.0](./LICENSE) license.
