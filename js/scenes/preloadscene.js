class PreloadScene extends Phaser.Scene {
  constructor() {
    super({key: 'PreloadScene'});
  }

  preload() {
    this.progressBar = this.add.graphics();
    this.load.on('progress', this.onProgress, this);

    this.load.image('grass', './assets/grass.png');
    this.load.image('tree', './assets/tree_cartoon_big.png');
    this.load.image('treeGreen', './assets/tree_cartoon_big_green.png');
    this.load.image('treeBrown', './assets/tree_cartoon_big_brown.png');
    this.load.image('apple', './assets/apple.png');
    this.load.image('melon', './assets/melon.png');
    this.load.image('orange', './assets/orange.png');
    this.load.image('barrel', './assets/barrel.png');
    this.load.image('blueberry', './assets/blueberry.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('explosion', './assets/explosion_01_strip13.png', { frameWidth: 196, frameHeight: 190 });
    this.load.spritesheet('splash', './assets/splash.png', { frameWidth: 62, frameHeight: 33 });
    this.load.spritesheet('blood', './assets/blood_hit_05.png', { frameWidth: 128, frameHeight: 128 });


    this.load.audio('theme', './assets/LaNative8-bit.wav');
    this.load.audio('fireSound', './assets/laser_blast.wav');
    this.load.audio('explosionSound', './assets/expl05.wav');
    this.load.audio('barrelSound', './assets/ClassicGameWin.wav');
    this.load.audio('appleSound', './assets/star.wav');

  }

  onProgress(value) {
    this.progressBar.clear();
    this.progressBar.fillStyle(0xbebebe, 1);
    this.progressBar.fillRect(100, 280, 600 * value, 40);
  }

  create() {
    console.log('PreloadScene create');
    this.scene.start('StartScene');
  }
}