/*
Jest - Mock Functions
----------------------------------------------------------------------------

Mock functions allow you to test the links between code by erasing the actual
implementation of a function, capturing calls to the function (and the parameters
  passed in those calls), capturing instances of constructor functions when
  instantiated with new, and allowing test-time configuration of return values.

There are two ways to mock functions:

1. Creating a mock function to use in test code
2. Writing a manual mock to override a module dependency (https://jestjs.io/docs/manual-mocks)
*/

// Using a mock function
// ----------------------------------------------------------------------------

// This function invokes a callback for each item in a supplied array.
function forEachItem(items, callback) {
  items.forEach((item) => {
    callback(item);
  });
}

function someCallback(item) {
  return 42 + item;
}

// How can we test that the someCallback() callback function is invoked as expected?
forEachItem([1, 2, 3], someCallback);

// We can use a mock function.
// const mockCallback = jest.fn((item) => 42 + item);
// or, simply pass a reference to the callback function to be tested
const mockCallback = jest.fn(someCallback);

test('The mock function (mockCallback) is called three times', () => {
  forEachItem([1, 2, 3], mockCallback);
  expect(mockCallback.mock.calls).toHaveLength(3);
});

test('The first argument of the first call to the function was 1', () => {
  forEachItem([1, 2, 3], mockCallback);
  expect(mockCallback.mock.calls[0][0]).toBe(1);
});

test('The first argument of the second call to the function was 2', () => {
  forEachItem([1, 2, 3], mockCallback);
  expect(mockCallback.mock.calls[1][0]).toBe(2);
});

test('The return value of the first call to the function was 43', () => {
  forEachItem([1, 2, 3], mockCallback);
  expect(mockCallback.mock.results[0].value).toBe(43);
});

// .mock property
// ----------------------------------------------------------------------------
// All mock functions have this special .mock property, which is where data about
// how the function has been called and what the function returned is kept.
forEachItem([1, 2, 3], mockCallback);
// console.log(mockCallback.mock);
/*
Output:
{
  calls: [ [ 1 ], [ 2 ], [ 3 ] ],
  instances: [ undefined, undefined, undefined ],
  invocationCallOrder: [ 1, 2, 3 ],
  results: [
    { type: 'return', value: 43 },
    { type: 'return', value: 44 },
    { type: 'return', value: 45 }
  ]
}
*/
