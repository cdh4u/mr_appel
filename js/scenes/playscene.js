class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  

  hitPlayer(player, fruit){
    console.log(fruit.texture.key);
    if(fruit.texture.key == "apple"){
      fruit.destroy();
      this.collected += 1;
      this.collText.setText('Collected: ' + this.collected);
    } else {
      this.cameras.main.shake(100);
    }
  }

  hitGrass(fruit, grass){   
    //console.log(fruit.body._dy);
    //console.log(fruit.texture.key);

    if(fruit.texture.key == "melon"){
      fruit.destroy();

      /*var tempX = fruit.x;
      var tempY = fruit.y;
      this.splash = this.physics.add.sprite(tempX, tempY, 'splash',0);
      this.splash.on('animationcomplete',(function () {	console.log('animation complete');console.log(this);}), this);
      this.splash.anims.play('splash', true);*/
    }

  }




  hitFruit (fruit, bullet) {
    /*star.disableBody(true, true);
    bullet.disableBody(true, true);
    // Make the bullet available again
    this.bulletActive = false;
    //  Add and update the score
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
    this.numOfStars -= 1;
    console.log("Num of stars: ", this.numOfStars);
    if(this.numOfStars == 0){
        this.create();
        
        sprite.on('animationcomplete',completeFunction,this);
        sprite.destroy();
        
        */
  }


  create() {
    console.log('PlayScene create');

    // Set bulletActive property to false
    this.bulletActive = false;
    this.score = 0;
    this.collected = 0;


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

    // Add player    
    this.player = this.physics.add.sprite(400, 550, 'dude',4);
    this.player.setCollideWorldBounds(true);

    // Define collision between fruits and player
    this.physics.add.overlap(this.fruits, this.player, this.hitPlayer, null, this);
    // Define collision between fruits and grass
    this.physics.add.collider(this.fruits,this.grass, this.hitGrass, null, this);
    // Define collision between bullet and fruit
    //this.physics.add.collider(this.fruits,this.bullet, this.hitFruit, null, this);

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
    this.ammoText = this.add.text(16, 146, 'Ammunition: 0', { fontSize: '32px', fill: '#000' }).setDepth(1);
    this.collText = this.add.text(16, 176, 'Collected: ' + this.collected, { fontSize: '32px', fill: '#000' }).setDepth(1);



    // Key press inputs

    this.cursors = this.input.keyboard.createCursorKeys();

    
  }

  update() {

    // Fire a bullet
    if (this.cursors.up.isDown) {
      console.log("Up pressed");
      if(!this.bulletActive) {
          console.log("Bullet shot");
          this.bullet = this.physics.add.sprite(this.player.x,this.player.y-40,"blueberry");
          //this.physics.add.overlap(this.bullet, this.stars, this.hitStar, null, this);
          this.bulletActive = true;
          //this.bullet.x = this.spaceshipSprite.x;
          //this.bullet.y = this.spaceshipSprite.y - 50;
          //this.bullet.setActive(true).setVisible(true);
          this.bullet.body.velocity.y = -250;
      }
    }

    // Check if bullet is to be removed
    if(this.bulletActive) {
      if(this.bullet.y < 250) {
        this.bullet.destroy();
        //this.bullet.disableBody(true,true);
        this.bulletActive = false;
      }
    }
    


    // Update player position
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





    // Check if new fruit is to be generated
    if (Phaser.Math.Between(1, 100) == 1) {

      
      // Restart game
      // restart game
      // this.time.delayedCall(500, function() {
      //  this.scene.restart();
      // }, [], this);

      // Fade camera
      // fade camera
      //this.time.delayedCall(250, function() {
      //  this.cameras.main.fade(2500);
      //}, [], this);


      // Select fruit 
      this.fruitKeys = ['apple', 'melon', 'orange'];
      this.fruitNum = Phaser.Math.Between(0,2);

      var fruit = this.fruits.create(Phaser.Math.Between(100, 700), 50, this.fruitKeys[this.fruitNum]);
      console.log('!!! ' + fruit.texture.key)
      fruit.body.setVelocityY(100);
      fruit.body.velocity.x = 0;
      fruit.setScale(2);
      fruit.setCollideWorldBounds(true);
      // All fruits except melons will bounce
      if(this.fruitNum != 1){
        fruit.setBounceY(0.9);
      }
      fruit.setGravityY(100);


      /*this.fruit = this.physics.add.sprite(Phaser.Math.Between(100, 700),50,this.fruitKeys[this.fruitNum]).setScale(2);
      this.fruit.body.setVelocityY(100);
      this.fruit.body.velocity.x = 0;
      this.fruit.setCollideWorldBounds(true);
      this.fruit.setBounceY(0.9);
      this.fruit.setGravityY(100);
      this.fruits.add(this.fruit);*/
    }


    /*if(this.cursors.left.isDown) {
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
    }*/
  }
}