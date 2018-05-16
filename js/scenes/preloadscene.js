class PreloadScene extends Phaser.Scene {
  constructor() {
    super({key: 'PreloadScene'});
  }

  preload() {
    this.progressBar = this.add.graphics();

    this.load.on('progress', this.onProgress, this);

    this.load.image('player', '../assets/player.png');
    this.load.image('bullet', '../assets/bullet.png');
    this.load.image('enemy', '../assets/enemy.png');
  }

  onProgress(value) {
    this.progressBar.clear();
    this.progressBar.fillStyle(0xbebebe, 1);
    this.progressBar.fillRect(100, 280, 600 * value, 40);
  }

  create() {
    console.log('PreloadScene create');
    this.scene.start('PlayScene');
  }
}