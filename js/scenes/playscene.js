class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  create() {
    console.log('PlayScene create');

    this.player = this.physics.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height - 100, 'player');
    this.player.setDragX(750);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.bullets = this.add.group({classType: Bullet, runChildUpdate: true});
  }

  update() {

    if(this.cursors.left.isDown) {
      this.player.body.setVelocityX(-5*60);
    }
    else if(this.cursors.right.isDown) {
      this.player.body.setVelocityX(5*60);
    }

    if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      let bullet = this.bullets.get();
      if(bullet) {
        bullet.fire(this.player);
      }
    }
  }
}