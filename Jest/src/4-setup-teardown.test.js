/* eslint-disable arrow-body-style */
/*
Jest - Setup, Teardown and Scoping
----------------------------------------------------------------------------

beforeEach and afterEach
Provides a way to perform some action before and after each test.

beforeAll and afterAll
Provides a way to perform some action before and after all tests.

describe
Provides a way to group tests. Jest executes all describe handlers in a test
file before it executes any of the actual tests.
*/

let database;
const data = [];

function connectDB() {
  database = 'connected';
  return Promise.resolve();
}

function closeDB() {
  database = 'closed';
  return Promise.resolve();
}

function populateDB() {
  data.push('Sven', 'Barbara', 'Valentina');
  return Promise.resolve('initialized');
}

function clearDB() {
  data.length = 0;
  return Promise.resolve('cleared');
}

// Applies to all tests in this file
beforeAll(() => {
  // Don't forget to use 'return' if a function returns a promise
  return connectDB();
});

afterAll(() => {
  return closeDB();
});

test('Database is connected', () => {
  expect(database).toBe('connected');
});

describe('Data test', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return populateDB();
  });

  afterEach(() => {
    return clearDB();
  });

  test('data includes Barbara', () => {
    expect(data).toContain('Barbara');
  });

  test('data includes Valentina', () => {
    expect(data).toContain('Valentina');
  });
});

describe('Foo', () => {
  test('Foo test', () => {
    expect(true).toBe(true);
  });
});
