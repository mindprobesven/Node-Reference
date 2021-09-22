/* eslint-disable arrow-body-style */

/*
Our mocked class will need to provide any member functions (playSoundFile in
this example) that will be called during our tests.

To be able to spy on calls to this method, we need to populate playSoundFile
with 'another' mock function using jest.fn().
*/

// This mock function will be imported in the test file to spy on it and use
// the custom implementation.
const mockPlaySoundFile = jest.fn((file) => {
  console.log(`Called Mock: Playing sound file: ${file}`);
});

// This provides any member function that will be called during tests.
const mock = jest.fn().mockImplementation(() => {
  // playSoundFile is populated with the mock implementation mockPlaySoundFile.
  return { playSoundFile: mockPlaySoundFile };
});

// mock is the default export
module.exports = mock;

// mockPlaySoundFile is a named export
module.exports.mockPlaySoundFile = mockPlaySoundFile;
