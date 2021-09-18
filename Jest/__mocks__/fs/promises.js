/* eslint-disable no-underscore-dangle */

// createMockFromModule()
// Generatea an automatic mock, and 'overrides' its default behavior
const promises = jest.createMockFromModule('fs/promises');

// requireActual()
// Require the real module amending it with mock functions before exporting it
// const promises = jest.requireActual('fs/promises');

let files = [];

// We create mock functions using jest.fn() to be able to inspect the .mock
// property (calls, instances, return values, etc.). If it's not necessary
// to inspect the .mock property in tests, the mock function can be created
// without jest.fn()
const __setFakeFiles = jest.fn((filesArray) => {
  files = filesArray;
});

const readdir = jest.fn((path) => new Promise((resolve, reject) => (
  path === './'
    ? resolve(files)
    : reject(new Error('No such file or directory'))
)));

promises.__setFakeFiles = __setFakeFiles;
promises.readdir = readdir;

module.exports = promises;
