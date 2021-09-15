const BASE_URL = require('../constants');

const users = {
  1: { name: 'Sven Kohn' },
  2: { name: 'Ervin Howell' },
};

const request = (url) => new Promise((resolve, reject) => {
  console.log('Running mock version');
  const userID = parseInt(url.substr(BASE_URL.length), 10);
  return users[userID]
    ? resolve({ data: users[userID] })
    : reject(new Error('Request failed with status code 404'));
});

module.exports = request;
