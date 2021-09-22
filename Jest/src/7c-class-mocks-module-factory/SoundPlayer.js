/* eslint-disable class-methods-use-this */

class SoundPlayer {
  constructor() {
    console.log('Called: SoundPlayer constructor');
  }

  playSoundFile(file) {
    console.log(`Called Original: Playing sound file: ${file}`);
  }
}

module.exports = SoundPlayer;
