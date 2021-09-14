/* eslint-disable max-len */

/*
Jest - Mocking Modules
----------------------------------------------------------------------------
*/

const axios = require('axios');
const Users = require('./5c-mock-modules');

// In order to test Users.getAll() without actually hitting the API (and thus creating
// slow and fragile tests), we can use the jest.mock(...) function to automatically
// mock the axios module.
//
// Once we mock the module we can provide a mockResolvedValue that returns the data
// we want our test to assert against. In effect, we are saying that we want axios to return
// a fake response.

jest.mock('axios');

describe('Users.getAll()', () => {
  describe('If the API call is successful', () => {
    test('Should return users list', async () => {
      const users = [
        { name: 'Sven' },
        { name: 'Barbara' },
      ];
      const response = { data: users };

      axios.get.mockResolvedValueOnce(response);

      await expect(Users.getAll()).resolves.toEqual(response);
      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });
  });

  describe('If the API call fails', () => {
    test('Should return error', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(Users.getAll()).rejects.toBeInstanceOf(Error);
      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });
  });
});
