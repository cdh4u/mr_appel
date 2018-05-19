class StartScene extends Phaser.Scene {
    constructor() {
      super({key: 'StartScene'});
    }
    
    create() {
        console.log('StartScene create');

        this.add.image(400, 400, 'tree').setScale(2);
        this.startText = this.add.text(240, 176, 'Mr Appel', { fontSize: '70px', fill: '#FFF' }).setDepth(1); 
        
        /*this.infoText = this.add.text(320, 300, 'CONTROLS', { fontSize: '32px', fill: '#000' }); 
        this.infoText = this.add.text(220, 330, 'LETF  - Move letf', { fontSize: '32px', fill: '#FFF' });
        this.infoText = this.add.text(220, 360, 'RIGHT - Move right', { fontSize: '32px', fill: '#FFF' });
        this.infoText = this.add.text(220, 390, 'UP    - Shoot', { fontSize: '32px', fill: '#FFF' });

        this.infoText = this.add.text(220, 490, 'Collect apples, and avoid being hit by oranges and melones.', { fontSize: '32px', fill: '#FFF' });
        this.infoText = this.add.text(220, 510, 'After a maximum of 3 apples have been collecte, the must be.', { fontSize: '32px', fill: '#FFF' });
        this.infoText = this.add.text(220, 530, 'taken to the barrel in the right corner. Going to the', { fontSize: '32px', fill: '#FFF' });
        this.infoText = this.add.text(220, 550, 'the barrel will also re-fill the blueberry ammonition.', { fontSize: '32px', fill: '#FFF' });
        */
        
        
        
        
        this.startText = this.add.text(240, 246, 'Press UP For Info', { fontSize: '32px', fill: '#FFF' }).setDepth(1);
        this.startText = this.add.text(220, 276, 'Press DOWN To Start', { fontSize: '32px', fill: '#FFF' }).setDepth(1);

        // Key press inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }

    update(){
        if (this.cursors.down.isDown) {
            this.cameras.main.fade(250);
            this.time.delayedCall(300, function() {
                this.scene.start('PlayScene');  
              }, [], this);
        }
        if (this.cursors.up.isDown) {
            this.cameras.main.fade(250);
            this.time.delayedCall(300, function() {
                this.scene.start('InfoScene');  
              }, [], this);
        }
    }
  }