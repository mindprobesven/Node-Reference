/* eslint-disable no-unused-vars */

class Response {
  constructor(data) {
    this.data = data;
  }

  text() {
    return this.data;
  }
}

const asyncFetchAPI = (url, method) => Promise.resolve(new Response('5'));

module.exports = asyncFetchAPI;
module.exports.Response = Response;
