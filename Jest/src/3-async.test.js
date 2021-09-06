/* eslint-disable jest/no-try-expect */
/* eslint-disable arrow-body-style */
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

test('fetchData1 data is peanut butter', (done) => {
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

// Promises - Using .then and .catch
// ----------------------------------------------------------------------------
const fetchData2 = (value) => new Promise((resolve, reject) => {
  if (value === 'ok') {
    resolve('peanut butter');
  } else {
    reject(new Error('Foo'));
  }
});

test('fetchData2 data is peanut butter', () => {
  // Be sure to return the promise or the test will complete before the promise
  // returned from fetchData2 resolves.
  return fetchData2('ok').then((data) => expect(data).toBe('peanut butter'));
});

test('fetchData2 fails with an error', () => {
  // If you expect a promise to be rejected, use the .catch method. Make sure to
  // add 'expect.assertions' to verify that a certain number of assertions are called.
  expect.assertions(3);
  return fetchData2('fail')
    .catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Foo');
      expect(error).toHaveProperty('message', 'Foo');
    });
});

// Promises - Using .resolves and .rejects
// ----------------------------------------------------------------------------
const fetchData3 = (value) => new Promise((resolve, reject) => {
  if (value === 'ok') {
    resolve('peanut butter');
  } else {
    reject(new Error('Foo'));
  }
});

test('fetchData3 data is peanut butter', () => {
  // You can also use the .resolves matcher in your expect statement, and Jest will
  // wait for that promise to resolve. If the promise is rejected, the test will
  // automatically fail.
  return expect(fetchData3('ok')).resolves.toBe('peanut butter');
});

test('fetchData3 fails with an error', () => {
  return expect(fetchData3('fail')).rejects.toBeInstanceOf(Error);
});

// Async and Await - Using try and catch
// ----------------------------------------------------------------------------
const fetchData4 = (value) => new Promise((resolve, reject) => {
  if (value === 'ok') {
    resolve('peanut butter');
  } else {
    reject(new Error('Foo'));
  }
});

test('fetchData4 data is peanut butter', async () => {
  const data = await fetchData4('ok');
  expect(data).toBe('peanut butter');
});

test('fetchData4 fails with an error', async () => {
  expect.assertions(3);
  try {
    await fetchData4('fail');
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Foo');
    expect(error).toHaveProperty('message', 'Foo');
  }
});

// Async and Await - Using combo of async/await and .resolves/.rejects
// ----------------------------------------------------------------------------
const fetchData5 = (value) => new Promise((resolve, reject) => {
  if (value === 'ok') {
    resolve('peanut butter');
  } else {
    reject(new Error('Foo'));
  }
});

test('fetchData5 data is peanut butter', async () => {
  await expect(fetchData5('ok')).resolves.toBe('peanut butter');
});

test('fetchData5 fails with an error', async () => {
  expect.assertions(2);
  await expect(fetchData5('fail')).rejects.toBeInstanceOf(Error);
  await expect(fetchData5('fail')).rejects.toHaveProperty('message', 'Foo');
});
