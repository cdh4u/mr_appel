class GameoverScene extends Phaser.Scene {
    constructor() {
      super({key: 'GameoverScene'});
    }
    
    create() {
        console.log('GameoverScene create');
        this.gameoverText = this.add.text(200, 250, 'GAME OVER', { fontSize: '80px', fill: '#000' }).setDepth(1);
        this.gameoverText = this.add.text(80, 350, 'No Animals Were Harmed In The Making Of This Game', { fontSize: '22px', fill: '#000' }).setDepth(1);
        this.gameoverText = this.add.text(200, 570, 'Press DOWN To Continue', { fontSize: '32px', fill: '#000' }).setDepth(1);

        var sound = this.sound.add('gameoverSound');
        sound.setLoop(false);
        sound.play();
    
        // Key press inputs
         this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.down.isDown) {
            this.cameras.main.fade(250);
            this.time.delayedCall(300, function() {
                this.scene.start('StartScene');  
              }, [], this);
        }
    }
  }