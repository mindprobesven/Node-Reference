/* eslint-disable class-methods-use-this */

const SoundPlayer = require('./SoundPlayer');

class SoundPlayerConsumer {
  constructor() {
    this.soundPlayer = new SoundPlayer();
  }

  playSomethingCool() {
    this.soundPlayer.playSoundFile('cool.mp3');
  }
}

module.exports = SoundPlayerConsumer;
