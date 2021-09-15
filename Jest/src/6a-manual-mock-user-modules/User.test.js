/* eslint-disable max-len */

/*
Jest - Manual Mocks - Mocking user modules
----------------------------------------------------------------------------
Manual mocks are used to stub out functionality with mock data. For example,
instead of accessing a remote resource like a website or a database, you might
want to create a manual mock that allows you to use fake data. This ensures your
tests will be fast and not flaky.

User module manual mocks are defined by writing a module in a __mocks__/ subdirectory
immediately adjacent to the module.

In this example, we are mocking the user defined module 'request.js', because it uses
axios to fetch data from an API. The mock of request.js is located in the adjacent __mocks__
directory.
*/

// Adding this will tell Jest to use the manual mock.
// Comment this line and Jest will use the original module with axios instead.
jest.mock('./request');

const User = require('./User');

describe('User.getUsername()', () => {
  it('User ID: 2 returns name = Ervin Howell', async () => {
    try {
      console.log(await User.getUserName(2));
    } catch (error) {
      console.log(error);
    }

    await expect(User.getUserName(2)).resolves.toEqual('Ervin Howell');
  });

  it('User ID: 99 returns error', async () => {
    try {
      console.log(await User.getUserName(99));
    } catch (error) {
      console.log(error.message);
    }

    await expect(User.getUserName(99)).rejects.toBeInstanceOf(Error);
    await expect(User.getUserName(99)).rejects.toHaveProperty('message', 'Request failed with status code 404');
  });
});
