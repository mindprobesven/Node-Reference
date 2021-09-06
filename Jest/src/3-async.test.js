/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-done-callback */
/* eslint-disable no-multi-spaces */

/*
Jest - Asynchronous
----------------------------------------------------------------------------
*/

// Callbacks
// ----------------------------------------------------------------------------
// Instead of putting the test in a function with an empty argument, use a single
// argument called 'done'. Jest will wait until the done callback is called before
// finishing the test.
//
// If done() is never called, the test will fail (with timeout error), which is what
// you want to happen.
//
// If the expect statement fails, it throws an error and done() is not called. If we want
// to see in the test log why it failed, we have to wrap expect in a try block and pass
// the error in the catch block to done. Otherwise, we end up with an opaque timeout error
// that doesn't show what value was received by expect(data).
function fetchData1(callback) {
  return callback('peanut butter');
}

test('the data is peanut butter', (done) => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData1(callback);
});

// Promises
// ----------------------------------------------------------------------------
const fetchData2 = (value) => new Promise((resolve, reject) => {
  if (value === 'ok') {
    resolve('peanut butter');
  } else {
    reject(new Error('Foo'));
  }
});

test('the data is also peanut butter', () => {
  expect.assertions(1);
  return fetchData2('ok')
    .then((data) => {
      expect(data).toBe('peanut butter');
    });
});

test('fetchData2 fails with an error', () => {
  expect.assertions(1);
  return fetchData2()
    .catch((error) => expect(() => error()).toThrow('Foo'));
});
