/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

/*
Jest - Mocking a Class using the jest.mock() module factory parameter
----------------------------------------------------------------------------

A module factory is a function that returns the mock. In order to mock a constructor
function, the module factory must return a constructor function. In other words, the
module factory must be a function that returns a function - a higher-order function (HOF).

A limitation with the factory parameter is that, since calls to jest.mock() are hoisted to
the top of the file, it's not possible to first define a variable and then use it in the
factory. An exception is made for variables that start with the word 'mock'. In this example,
the variable defined before jest.mock() is mockPlaySoundFile.
*/

const SoundPlayer = require('./SoundPlayer');
const SoundPlayerConsumer = require('./SoundPlayerConsumer');

const mockPlaySoundFile = jest.fn((file) => {
  console.log(`Called Mock: Playing sound file: ${file}`);
});

// Here jest.mock() uses a module factory parameter
jest.mock('./SoundPlayer', () => {
  // It returns a constructor function to be able to mock a constructor function
  return jest.fn().mockImplementation(() => {
    // playSoundFile is populated with the mock implementation mockPlaySoundFile.
    return { playSoundFile: mockPlaySoundFile };
  });
});

describe('Testing SoundPlayerConsumer class', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    SoundPlayer.mockClear();
    mockPlaySoundFile.mockClear();
  });

  it('Consumer called method playSoundFile() in SoundPlayer class instance', () => {
    const consumer = new SoundPlayerConsumer();

    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    consumer.playSomethingCool();

    // The mockPlaySoundFile has a .mock property we can spy on
    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
    expect(mockPlaySoundFile).toHaveBeenCalledWith('cool.mp3');
  });
});
