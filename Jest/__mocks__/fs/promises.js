/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

// createMockFromModule()
// Generatea an automatic mock, and 'overrides' its default behavior
const promises = jest.createMockFromModule('fs/promises');

// requireActual()
// Require the real module amending it with mock functions before exporting it
// const promises = jest.requireActual('fs/promises');

let files = [];

const __setFakeFiles = jest.fn((filesArray) => {
  files = filesArray;
});

const readdir = jest.fn((path) => new Promise((resolve, reject) => {
  console.log('Using mock!');
  resolve(files);
}));

/* const readdir = (path) => new Promise((resolve, reject) => {
  console.log('Using mock!');
  resolve(files);
}); */

promises.__setFakeFiles = __setFakeFiles;
promises.readdir = readdir;

module.exports = promises;
