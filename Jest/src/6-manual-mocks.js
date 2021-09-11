const axios = require('axios');

class Users {
  static getAll() {
    return axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    });
  }
}

module.exports = Users;
