/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

const asyncFetchAPI = require('./asyncFetchAPI');

const createUser = async () => {
  const response = await asyncFetchAPI('http://website.com/users', { method: 'POST' });
  const userID = response.text();
  return userID;
};

module.exports = createUser;
