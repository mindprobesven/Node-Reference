/*
Jest - Setup
----------------------------------------------------------------------------

1. Installation
npm install --save-dev jest eslint-plugin-jest @types/jest

Note: @types/jest adds Jest intellisense in VSCode

2. ESLint configuration
Add jest to the plugins section of .eslintrc configuration file
"plugins": ["jest"]

Add shareable configuration presets (recommended and style)
"extends": [
  "plugin:jest/recommended",
  "plugin:jest/style",
  "airbnb"
]

3. Create the default Jest config file (jest.config.js)
npx jest --init

4. Run tests manually
Add to package.json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watchAll",
  "test:watch:single": "jest --watch --findRelatedTests src/6b-manual-mock-core-node-modules/fileTool.js",
}

Running tests using the VSCode extension 'Jest'
----------------------------------------------------------------------------
1. Install the VSCode extension 'Jest'
2. In the VSCode settings add:
"jest.autoRun": {"watch": false, "onSave": "test-file"},

With this configuration, the extension will trigger test run for the given test file
upon save.
*/

function sum(a, b) {
  return a + b;
}

module.exports = sum;
