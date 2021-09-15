const axios = require('axios');

const request = async (url) => axios.get(url);

module.exports = request;
