/*
Jest - Setup
----------------------------------------------------------------------------

1. Installation
npm install --save-dev jest eslint-plugin-jest

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

4. Run a test
Add to package.json
"scripts": {
  "test": "jest",
}
*/

function sum(a, b) {
  return a + b;
}

module.exports = sum;
