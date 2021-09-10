/*
Jest - Mocking Modules
----------------------------------------------------------------------------
*/

// Users.js - the module to test
// ----------------------------------------------------------------------------
const axios = require('axios');

class Users {
  static getAll() {
    return axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    });
  }
}

// Users.test.js - the test
// ----------------------------------------------------------------------------
// In order to test this method without actually hitting the API (and thus creating
// slow and fragile tests), we can use the jest.mock(...) function to automatically
// mock the axios module.
//
// Once we mock the module we can provide a mockResolvedValue for that returns the data
// we want our test to assert against. In effect, we are saying that we want axios to return
// a fake response.
jest.mock('axios');

test('Fetched users array is of length 2', async () => {
  const users = [{ name: 'Sven' }, { name: 'Barbara' }];
  const response = { data: users };

  axios.mockResolvedValue(response);
  // or you could use the following depending on your use case:
  // axios.mockImplementation(() => Promise.resolve(response));

  const { data } = await Users.getAll();
  expect(data).toHaveLength(2);
});
