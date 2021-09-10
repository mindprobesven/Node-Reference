/* eslint-disable max-len */
/*
Jest - Mock Implementations
----------------------------------------------------------------------------

There are cases where it's useful to go beyond the ability to specify return
values and full-on replace the implementation of a mock function. This can be
done with jest.fn or the mockImplementationOnce method on mock functions.
*/

// Here, a mock function produces the same result on each call.
// ----------------------------------------------------------------------------
const myMock1 = jest.fn((callback) => callback(null, true));

test('Single call returns true', () => {
  myMock1((err, val) => expect(val).toBe(true));
});

// Here, mulitple mock function calls produce different results.
// ----------------------------------------------------------------------------
const myMock2 = jest
  .fn()
  .mockImplementationOnce((callback) => callback(null, true))
  .mockImplementationOnce((callback) => callback(null, false));

test('First call returns true, second call returns false', () => {
  expect.assertions(2);
  myMock2((err, val) => expect(val).toBe(true));
  myMock2((err, val) => expect(val).toBe(false));
});

// Here, When the mocked function runs out of implementations defined with
// mockImplementationOnce, it will execute the default implementation set with
// jest.fn (if it is defined)
// ----------------------------------------------------------------------------
const myMock3 = jest
  .fn((callback) => callback(null, 'default'))
  .mockImplementationOnce((callback) => callback(null, true))
  .mockImplementationOnce((callback) => callback(null, false));

test('First call true, second call false, further calls return default', () => {
  expect.assertions(3);
  myMock3((err, val) => expect(val).toBe(true));
  myMock3((err, val) => expect(val).toBe(false));
  myMock3((err, val) => expect(val).toBe('default'));
});
