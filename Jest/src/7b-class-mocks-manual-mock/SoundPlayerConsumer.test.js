/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

/*
Jest - Mocking a Class using a 'Manual mock'
----------------------------------------------------------------------------

Compared to creating an 'automatic mock', which only allows spying, the 'manual
mock' way, allows specifying a custom 'implementation' which can be used across
test files.

In this example, we are creating a manual mock of the SoundPlayer class in __mocks__.
We want to mock the class method playSoundFile() with a custom implementation.
Look at __mocks__/SoundPlayer.js for further instructions.
*/

const SoundPlayer = require('./SoundPlayer');
// The mocked playSoundFile class method of SoundPlayer
const { mockPlaySoundFile } = require('./SoundPlayer');

const SoundPlayerConsumer = require('./SoundPlayerConsumer');

jest.mock('./SoundPlayer');

describe('Testing SoundPlayerConsumer class', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    SoundPlayer.mockClear();
    mockPlaySoundFile.mockClear();
  });

  it('Consumer called the SoundPlayer class constructor', () => {
    const consumer = new SoundPlayerConsumer();

    expect(SoundPlayer).toHaveBeenCalledTimes(1);
  });

  it('Consumer called method playSoundFile() in SoundPlayer class instance', () => {
    const consumer = new SoundPlayerConsumer();
    consumer.playSomethingCool();

    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
    expect(mockPlaySoundFile).toHaveBeenCalledWith('cool.mp3');
  });
});
