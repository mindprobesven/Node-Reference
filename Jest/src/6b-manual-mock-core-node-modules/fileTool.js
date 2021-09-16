const { readdir } = require('fs/promises');

const listFiles = (path) => readdir(path);

module.exports = listFiles;
