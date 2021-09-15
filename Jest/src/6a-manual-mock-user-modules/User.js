/* eslint-disable max-len */

const request = require('./request');
const BASE_URL = require('./constants');

class User {
  static getUserName(userID) {
    return request(`${BASE_URL}${userID}`).then((response) => response.data.name);
  }
}

module.exports = User;
