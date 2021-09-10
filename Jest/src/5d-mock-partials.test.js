/*
Jest - Mocking Partials
----------------------------------------------------------------------------
Subsets of a module can be mocked and the rest of the module can keep their
actual implementation.
*/

const { foo, bar } = require('./5d-mock-partials');

// Mock only the export 'foo'
jest.mock('./5d-mock-partials', () => {
  const originalModule = jest.requireActual('./5d-mock-partials');

  return {
    ...originalModule,
    foo: 'mocked foo',
  };
});

test('foo is a partial mock and should return = mocked foo', () => {
  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
