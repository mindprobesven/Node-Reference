/* eslint-disable max-len */

/*
Jest - Bypassing module mocks
----------------------------------------------------------------------------

In this example, we want to test createUser(), which calls asyncFetchAPI().
The return value of asyncFetchAPI() is a 'Response' class instance.

We want to mock asyncFetchAPI(), but we also need to mock the return value,
with a 'Response'.

The problem, the imported 'Response' class for the test was mocked due to
the jest.mock('./asyncFetchAPI') and no longer behaves the way it should.

The solution is to use jest.requireActual to import the 'Response' class to bypass
the mock.
*/

jest.mock('./asyncFetchAPI');

const asyncFetchAPI = require('./asyncFetchAPI');

// This will not work because the imported 'Response' class for the test was
// mocked due to the jest.mock('./asyncFetchAPI')
// const { Response } = require('./asyncFetchAPI');

// To get around this problem, use jest.requireActual. This allows your test
// file to import the actual Response object from node-fetch, rather than a
// mocked version.
const { Response } = jest.requireActual('./asyncFetchAPI');

const createUser = require('./createUser');

describe('Testing createUser()', () => {
  it('createUser() calls asyncFetchAPI with the correct args and returns the user id', async () => {
    // Because we used jest.requireActual() to import the 'Response' class
    // we can use the actual object instead of a mocked version.
    asyncFetchAPI.mockResolvedValueOnce(new Response('5'));

    const userID = await createUser();

    expect(asyncFetchAPI).toHaveBeenCalledTimes(1);
    expect(asyncFetchAPI).toHaveBeenCalledWith('http://website.com/users', { method: 'POST' });

    expect(userID).toBe('5');
  });
});
