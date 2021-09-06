/* eslint-disable arrow-body-style */
/*
Jest - Setup, Teardown and Scoping
----------------------------------------------------------------------------
*/

let database;
const data = [];

function connectDB() {
  console.log('Connected');
  database = 'connected';
  return Promise.resolve();
}

function closeDB() {
  console.log('Closed');
  database = 'closed';
  return Promise.resolve();
}

function populateDB() {
  console.log('Init');
  data.push('Sven', 'Barbara', 'Valentina');
  return Promise.resolve('initialized');
}

function clearDB() {
  console.log('Clear');
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
