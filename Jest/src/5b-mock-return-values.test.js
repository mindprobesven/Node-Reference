/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/*
Jest - Mock Return Values
----------------------------------------------------------------------------

Mock functions can also be used to inject test values into your code during a test.
*/

// Injecting test return values
// ----------------------------------------------------------------------------
const myMock = jest.fn();

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

test('First call to myMock() returns 10', () => {
  expect(myMock()).toBe(10);
});

test('Second call to myMock() returns x', () => {
  expect(myMock()).toBe('x');
});

test('Further calls to myMock() return true', () => {
  expect.assertions(3);
  expect(myMock()).toBe(true);
  expect(myMock()).toBe(true);
  expect(myMock()).toBe(true);
});

// Functional continuation-passing
// ----------------------------------------------------------------------------
// Instead of recreating the behavior of the real component, return values are
// injected directly into the test right before it is used.
const someFilterDependencyFn = jest.fn();

someFilterDependencyFn
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(true);

// Here, filterStuff() dependents on the function someFilterDependencyFn(). Instead of
// recreating the behavior of the real dependency, we instead create a mock function and
// inject return values directly.
const filterStuff = (items) => items.filter(
  (item) => someFilterDependencyFn(item),
);

test('filterStuff with given array [1, 2, 3, \'x\'] returns [ 1, 3, \'x\' ]', () => {
  expect(filterStuff([1, 2, 3, 'x'])).toEqual([1, 3, 'x']);
});
