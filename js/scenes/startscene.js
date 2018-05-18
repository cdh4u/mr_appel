class StartScene extends Phaser.Scene {
    constructor() {
      super({key: 'StartScene'});
    }
    
    create() {
        console.log('StartScene create');

        this.add.image(400, 400, 'tree').setScale(2);
        this.startText = this.add.text(240, 176, 'Mr Appel', { fontSize: '70px', fill: '#FFF' }).setDepth(1); 
        this.startText = this.add.text(220, 246, 'Press DOWN To Start', { fontSize: '32px', fill: '#FFF' }).setDepth(1);
        this.startText = this.add.text(320, 300, 'CONTROLS', { fontSize: '32px', fill: '#FFF' }).setDepth(1); 
        this.startText = this.add.text(220, 330, 'LETF  - Move letf', { fontSize: '32px', fill: '#FFF' }).setDepth(1);
        this.startText = this.add.text(220, 360, 'RIGHT - Move right', { fontSize: '32px', fill: '#FFF' }).setDepth(1);
        this.startText = this.add.text(220, 390, 'UP    - Shoot', { fontSize: '32px', fill: '#FFF' }).setDepth(1);

        // Key press inputs
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if (this.cursors.down.isDown) {
            this.cameras.main.fade(250);
            this.time.delayedCall(500, function() {
                this.scene.start('PlayScene');  
              }, [], this);
        }
    }
  }