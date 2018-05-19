class InfoScene extends Phaser.Scene {
    constructor() {
      super({key: 'InfoScene'});
    }
    
    create() {
        console.log('InfoScene create');
        this.infoText = this.add.text(320, 20, 'CONTROLS', { fontSize: '32px', fill: '#000' }); 
        this.infoText = this.add.text(280, 60, 'LETF  - Move letf', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(280, 90, 'RIGHT - Move right', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(280, 120, 'UP    - Shoot', { fontSize: '22px', fill: '#000' });

        this.infoText = this.add.text(20, 160, 'Collect apples, and avoid being hit by oranges and melones.', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 190, 'After a maximum of 3 apples have been collected, they must be.', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 220, 'be taken to the barrel in the right corner.', { fontSize: '22px', fill: '#000' });

        this.infoText = this.add.text(20, 260, 'The fruits can be shot, using blueberries. One hit is', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 290, 'required to destroy an orange or an apple, and 3 hits to', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 320, 'destroy a melon. Going to the barrel will also re-fill', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 350, 'the blueberry ammonition.', { fontSize: '22px', fill: '#000' });


        this.infoText = this.add.text(20, 390, 'The game will finish if the player is hit by a melon or an', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 420, 'orange, or if the player has collected 3 apples and is hit', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 450, 'by an apple before the collected apples are brought to the', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 480, 'barrel. The game will also finish if a fruit stops bouncing', { fontSize: '22px', fill: '#000' });
        this.infoText = this.add.text(20, 510, 'before being shot or collected.', { fontSize: '22px', fill: '#000' });

        this.infoText = this.add.text(200, 570, 'Press DOWN To Continue', { fontSize: '32px', fill: '#000' }).setDepth(1);



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