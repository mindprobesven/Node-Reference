/* eslint-disable max-len */

/*
Jest - Mocking Partials
----------------------------------------------------------------------------
Subsets of a module can be mocked and the rest of the module can keep their
actual implementation.
*/

const { foo, bar, baz } = require('./5d-mock-partials');

// Mock only the exports 'foo' and 'baz'
jest.mock('./5d-mock-partials', () => {
  const originalModule = jest.requireActual('./5d-mock-partials');

  return {
    ...originalModule,
    foo: 'mocked foo',
    baz: jest.fn(() => 'mocked baz'),
  };
});

test('foo is a partial mock and should return = mocked foo', () => {
  expect(foo).toBe('mocked foo');
});

test('bar keeps its actual implementation', () => {
  expect(bar()).toBe('bar');
});

test('baz is a partial mock, as well as a mock function with .mock property', () => {
  expect(baz()).toBe('mocked baz');
  expect(baz.mock.results[0].value).toBe('mocked baz');
});
