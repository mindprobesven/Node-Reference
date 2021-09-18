/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

/*
Jest - Manual Mocks - Mocking Node modules
----------------------------------------------------------------------------
If the module you are mocking is a Node module, the mock should be placed in
the __mocks__ directory adjacent to node_modules.

Scoped modules (also known as scoped packages) can be mocked by creating a file
in a directory structure that matches the name of the scoped module. In this example,
we are mocking a scoped module called 'fs/promise' in __mocks__/fs/promises.js

In this example we are creating a manual mock for the 'fs' module to avoid actually
hitting the disk (that's pretty slow and fragile). The manual mock will implement
custom versions of the fs APIs that we can build on for our tests. To be specific,
this example will mock the readdir() function of fs/promises, which would normally
return a list of files and directory in the given path.
*/

// Adding this will tell Jest to use the manual mock.
jest.mock('fs/promises');

// We need to require 'fs/promises' to be able to call fsPromises.__setFakeFiles()
// to reset the fake files array to be empty
const fsPromises = require('fs/promises');

// The function to be tested, which happens to use the 'fs' node core module.
const listFiles = require('./fileTool');

describe('Testing listFiles()', () => {
  // Here, before each test, we call the mock function fsPromises.__setFakeFiles()
  // to reset the fake files array to be empty.
  beforeEach(() => {
    fsPromises.__setFakeFiles([]);

    // Then, we use clear or reset to reset all information stored in the mockFn.mock.calls
    // and mockFn.mock.instances arrays.

    // This resets all information stored in the mockFn.mock.calls and mockFn.mock.instances arrays.
    fsPromises.__setFakeFiles.mockClear();

    // This does everything that mockFn.mockClear() does, and also removes any mocked return values
    // or implementations.
    // fsPromises.__setFakeFiles.mockReset();

    // This clears the mock.calls and mock.instances properties of all mocks. Equivalent to calling
    // .mockClear() on every mocked function.
    // jest.clearAllMocks();

    // This resets the state of all mocks. Equivalent to calling .mockReset() on every mocked function.
    // jest.resetAllMocks();
  });

  it('Returns a list of files and directories for "./" which contains = src', async () => {
    const fileList = [
      '.eslintrc',
      '__mocks__',
      'jest.config.js',
      'node_modules',
      'package-lock.json',
      'package.json',
      'src',
    ];

    // We created a custom function in the manual mock to set a fake file / directory list
    fsPromises.__setFakeFiles(fileList);

    expect(fsPromises.__setFakeFiles).toHaveBeenCalledTimes(1);
    expect(fsPromises.__setFakeFiles).toHaveBeenCalledWith(fileList);

    await expect(listFiles('./')).resolves.toContain('src');

    expect(fsPromises.readdir).toHaveBeenCalledTimes(1);
    expect(fsPromises.readdir).toHaveBeenCalledWith('./');
  });

  it('Returns an error for "./foo"', async () => {
    await expect(listFiles('./foo')).rejects.toBeInstanceOf(Error);
    await expect(listFiles('./foo')).rejects.toHaveProperty('message', 'No such file or directory');

    expect(fsPromises.readdir).toHaveBeenCalledTimes(2);
    expect(fsPromises.readdir).toHaveBeenCalledWith('./foo');
  });
});
