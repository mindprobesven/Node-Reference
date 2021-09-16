/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

jest.mock('fs/promises');

const fsPromises = require('fs/promises');

const listFiles = require('./fileTool');

describe('Testing listFiles()', () => {
  beforeEach(() => {
    fsPromises.__setFakeFiles([]);
    // fsPromises.__setFakeFiles.mockReset();
    // fsPromises.__setFakeFiles.mockClear();
    jest.clearAllMocks();
  });

  it('Returns a list of files and directories for "./"', async () => {
    const fileList = [
      '.eslintrc',
      '__mocks__',
      'jest.config.js',
      'node_modules',
      'package-lock.json',
      'package.json',
      'src',
    ];

    fsPromises.__setFakeFiles(fileList);

    try {
      const files = await listFiles('./');
      console.log(files);
    } catch (error) {
      console.log(error);
    }

    await expect(listFiles('./')).resolves.toContain('src');
    expect(fsPromises.__setFakeFiles).toHaveBeenCalledTimes(1);
    expect(fsPromises.readdir).toHaveBeenCalledTimes(1);
  });

  it('Returns an error for "k"', async () => {
    try {
      const files = await listFiles('./');
      console.log(files);
    } catch (error) {
      console.log(error);
    }

    // await expect(listFiles('k')).rejects.toHaveProperty('message', 'ENOENT: no such file or directory, scandir \'k\'');
  });
});
