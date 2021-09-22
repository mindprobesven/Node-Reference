/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

/*
Jest - Mocking a Class using 'Automatic mock'
----------------------------------------------------------------------------
*/

const SoundPlayer = require('./SoundPlayer');
const SoundPlayerConsumer = require('./SoundPlayerConsumer');

// Calling jest.mock('./SoundPlayer') returns a useful "automatic mock" you can
// use to spy on calls to the class constructor and all of its methods. It replaces
// the ES6 class with a mock constructor, and replaces all of its methods with mock
// functions that always return 'undefined'.
// Here,  SoundPlayer is now a mock constructor
jest.mock('./SoundPlayer');

describe('Testing SoundPlayerConsumer class', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    SoundPlayer.mockClear();
  });

  it('Consumer called the SoundPlayer class constructor', () => {
    const consumer = new SoundPlayerConsumer();

    expect(SoundPlayer).toHaveBeenCalledTimes(1);
  });

  it('Consumer called method playSoundFile() in SoundPlayer class instance', () => {
    const consumer = new SoundPlayerConsumer();

    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    // This will call the playSoundFile() method in the SoundPlayer class instance
    consumer.playSomethingCool();

    // SoundPlayer has a .mock property for spying on. To get the .mock property of
    // the playSoundFile method to spy on as well, we do the following
    const mockPlaySoundFile = SoundPlayer.mock.instances[0].playSoundFile;

    // The mockPlaySoundFile has a .mock property now we can spy on
    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
    expect(mockPlaySoundFile).toHaveBeenCalledWith('cool.mp3');
  });
});
