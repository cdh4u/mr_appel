class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  // Collision handler methods
  // =========================

  hitPlayer(player, fruit){
    console.log(fruit.texture.key);
    if(fruit.texture.key == "apple" && this.collected < 3){
      fruit.destroy();
      this.collected += 1;
      this.collText.setText('Collected: ' + this.collected);
    }else{
      this.gameOver = true;
      var tempX = player.x;
      var tempY = player.y;
      this.player.destroy();
      this.playerSplash = this.physics.add.sprite(tempX, tempY, 'splash',0);
      this.playerSplash.anims.play('splash', true);
      this.gameoverText = this.add.text(220, 250, 'GAME OVER', { fontSize: '80px', fill: '#000' }).setDepth(1);
      this.cameras.main.fade(3000);
      //this.fruits.kill();
      // Destroying a group with destroy() does not seem to work
      //this.fruits.destroy();
      /*this.fruits.children.iterate(function (child) {
        console.log(child);
        if(child) {
          //child.destroy();
        }
      });*/
      this.time.delayedCall(5000, function() {
        this.scene.start('StartScene');  
      }, [], this);
    }
  }

  hitGrass(fruit, grass){   
    if(fruit.texture.key == 'melon'){
      var tempX = fruit.x;
      var tempY = fruit.y;
      fruit.destroy();
      this.splash = this.physics.add.sprite(tempX, tempY, 'splash',0);
      this.splash.anims.play('splash', true);
      this.time.delayedCall(500, function() {
        this.splash.destroy();
      }, [], this);
    } else if (fruit.body._dy < 0.5) {
      fruit.destroy();
    }
  }

  hitFruit (bullet, fruit) {

    // NOTE: Eventhoug the function is called hitFruit(fruits, bullet) Phaser
    // seems to change the order when calling the funcction.
    // https://github.com/photonstorm/phaser/blob/master/src/physics/arcade/World.js

    console.log('Hit a ' + fruit.texture.key);
    console.log('Hits total: ' + fruit.hits);
    this.resetBullet();
    if(fruit.texture.key == 'orange'){
      this.score += 1;
      this.updateScore();
      fruit.destroy();
    } else if (fruit.texture.key == 'apple'){
      fruit.destroy();
    } else {
      fruit.hits += 1;
      if(fruit.hits == 3){
        this.score += 5;
        this.updateScore();
        fruit.destroy();
      }
    }
  }


  // Helper methods
  // ==============

  updateScore(){
    this.scoreText.setText('Score: ' + this.score);
  }

  renderAmmonition(){
    if(this.ammonition >= 0){
      this.bullets.children.getArray()[this.ammonition].setVisible(false);
    }
  }

  resetAmmonition(){
    for(var i=0;i<this.ammonition;i++){
      this.bullets.children.getArray()[i].setVisible(true);
    }
  }


  resetBullet(){
    this.bullet.x = 200;
    this.bullet.y = -50;
    this.bulletActive = false;
  }


  // Phaser callback mathods
  // =======================

  create() {
    console.log('PlayScene create');

    // Set bulletActive property to false
    this.bulletActive = false;
    this.barrelActive = false;
    this.gameOver = false;
    this.score = 0;
    this.collected = 0;
    this.ammonition = 10;
    //this.lives = 3;


    // Create group for fruits 
    this.fruits = this.physics.add.group();

    //this.add.image(400, 100, 'tree').setScale(2.5,3.5);
    this.add.image(400, -80, 'treeGreen').setScale(2.5,2.5).setDepth(0.9);
    this.add.image(420, 400, 'treeBrown').setScale(2.5,3.5);

    // Add barrel
    this.add.image(750, 525, 'barrel');

    // Render the grass by creating a static group and repeating the grass tile
    this.grass = this.physics.add.staticGroup({
      key: 'grass',
      repeat: 27,
      setXY: { x: 0, y: 590, stepX: 30 }
    });

    this.bullets = this.physics.add.group({
      key: 'blueberry',
      repeat: 9,
      setXY: { x: 50, y: 590, stepX: 30 }
    });
    


    // Add player    
    this.player = this.physics.add.sprite(400, 550, 'dude',4);
    this.player.setCollideWorldBounds(true);

    // Add bullet (outside of screen)
    this.bullet = this.physics.add.sprite(200,-40,"blueberry");

    // Define collision between fruits and player
    this.physics.add.overlap(this.fruits, this.player, this.hitPlayer, null, this);
    // Define collision between fruits and grass
    this.physics.add.collider(this.fruits,this.grass, this.hitGrass, null, this);
    // Define collision between bullet and fruits
    this.physics.add.collider(this.fruits,this.bullet, this.hitFruit, null, this);

    

    // Define animations

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'splash',
      frames: this.anims.generateFrameNumbers('splash', { start: 0, end: 4 }),
      frameRate: 10
    });

    // Text

    this.scoreText = this.add.text(16, 116, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' }).setDepth(1);
    this.ammoText = this.add.text(16, 146, 'Ammunition: ' + this.ammonition, { fontSize: '32px', fill: '#000' }).setDepth(1);
    this.collText = this.add.text(16, 176, 'Collected: ' + this.collected, { fontSize: '32px', fill: '#000' }).setDepth(1);
    //this.livesText = this.add.text(16, 206, 'Lives: ' + this.lives, { fontSize: '32px', fill: '#000' }).setDepth(1);
    //this.renderAmmonition(this.ammonition);

    // Key press inputs
    // NOTE: Seems like we need to define this again, even if it was defined in the startscene.
    this.cursors = this.input.keyboard.createCursorKeys();

    
  }

  update() {

    // Fire a bullet
    if (this.cursors.up.isDown) {
      console.log("Up pressed");
      if(!this.bulletActive && this.ammonition > 0) {
          console.log("Bullet shot");
          this.bullet.x = this.player.x;
          this.bullet.y = this.player.y;
          this.bulletActive = true;
          this.bullet.body.velocity.y = -250;
          this.ammonition -= 1;
          this.renderAmmonition();
          this.ammoText.setText('Ammonition: ' + this.ammonition);

      }
    }

    // Check if bullet is to be removed
    if(this.bulletActive) {
      if(this.bullet.y < 250) {
        this.resetBullet();
      }
    }
    
    // Check if player is on barrel
    if(this.player.x > 745 && !this.barrelActive){
      this.cameras.main.shake(100);
      this.barrelActive = true; 
      this.score += this.collected * 1;
      this.collected = 0;
      this.ammonition = 10;
      this.collText.setText('Collected: ' + this.collected);
      this.ammoText.setText('Ammonition: ' + this.ammonition);
      this.updateScore();
      this.resetAmmonition();
    }else if (this.player.x <= 745){
      this.barrelActive = false;
    }

    // Update player position
    if (!this.gameOver){
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    }
    else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }
    }

    // Check if new fruit is to be generated
    if (Phaser.Math.Between(1, 100) == 1 && !this.gameOver) {
      // Select fruit 
      this.fruitKeys = ['apple', 'melon', 'orange'];
      this.fruitNum = Phaser.Math.Between(0,2);

      var fruit = this.fruits.create(Phaser.Math.Between(100, 700), 50, this.fruitKeys[this.fruitNum]);
      fruit.hits = 0;
      fruit.body.setVelocityY(100);
      fruit.body.velocity.x = 0;
      fruit.setScale(2);
      fruit.setCollideWorldBounds(true);
      // All fruits except melons will bounce
      if(this.fruitNum != 1){
        fruit.setBounceY(0.9);
      }
      fruit.setGravityY(100);
    }
  }
}