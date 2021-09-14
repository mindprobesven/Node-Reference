const axios = require('axios');

class Users {
  static getAll() {
    return axios.get('https://jsonplaceholder.typicode.com/users');
  }
}

module.exports = Users;
