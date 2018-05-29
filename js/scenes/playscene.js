class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  // COLLISION HANDLERS
  // ==================

  hitPlayer(player, fruit){
    console.log(fruit.texture.key);
    if(fruit.texture.key == "apple" && this.collected < 3){
      this.particlesApple.emitParticleAt(this.player.x, this.player.y);
      fruit.destroy();
      this.playSound('appleSound');
      this.collected += 1;
      this.updateCollected();
    }else{
      this.gameOver = true;
      var blood = this.add.sprite(player.x, player.y+12, 'blood',0);
      this.player.destroy();
      this.playSound('explosionSound');
      blood.anims.play('blood', true);
      this.cameras.main.fade(3000);
      this.time.delayedCall(3000, function() {
        this.music.stop();
        this.scene.start('GameoverScene');  
      }, [], this);
    }
  }

  hitGrass(fruit, grass){   
    var tempX = fruit.x;
    var tempY = fruit.y;
    if(fruit.texture.key == 'melon'){
      fruit.destroy();
      this.splash = this.add.sprite(tempX, tempY, 'splash',0);
      this.splash.anims.play('splash', true);
      this.time.delayedCall(1000, function() {
        this.splash.destroy();
      }, [], this);
    } else if (fruit.body._dy < 0.5) {
      this.gameOver = true;
      var explosion = this.add.sprite(tempX, tempY+12, 'explosion',0);
      var blood = this.add.sprite(this.player.x, this.player.y+12, 'blood',0);
      this.player.destroy();
      fruit.destroy();
      this.playSound('explosionSound');
      explosion.anims.play('explosion', true);
      blood.anims.play('blood', true);      
      this.cameras.main.fade(3000);
      this.time.delayedCall(3000, function() {
        this.music.stop();
        this.scene.start('GameoverScene');  
      }, [], this);
    }
  }

  hitFruit (bullet, fruit) {

    // NOTE: Eventhoug the function is called hitFruit(fruits, bullet) Phaser
    // seems to change the order when calling the funcction.
    // https://github.com/photonstorm/phaser/blob/master/src/physics/arcade/World.js

    console.log('Hit a ' + fruit.texture.key);
    console.log('Hits total: ' + fruit.hits);
    var tempX = fruit.x;
    var tempY = fruit.y;
    this.resetBullet();
    if(fruit.texture.key == 'orange'){
      this.score += 1;
      this.updateScore();
      fruit.destroy();
      this.playSound('explosionSound');
      this.explosion = this.add.sprite(tempX, tempY, 'explosion',0);
      this.explosion.anims.play('explosion', true);
      this.time.delayedCall(1000, function() {
        this.explosion.destroy();
      }, [], this);
    } else if (fruit.texture.key == 'apple'){
      fruit.destroy();
      this.playSound('explosionSound');
      this.explosion = this.add.sprite(tempX, tempY, 'explosion',0);
      this.explosion.anims.play('explosion', true);
      this.time.delayedCall(1000, function() {
        this.explosion.destroy();
      }, [], this);
    } else {
      fruit.hits += 1;
      if(fruit.hits == 3){
        this.score += 5;
        this.updateScore();
        fruit.destroy();
        this.playSound('explosionSound');
        this.explosion = this.add.sprite(tempX, tempY, 'explosion',0);
        this.explosion.anims.play('explosion', true);
        this.time.delayedCall(1000, function() {
          this.explosion.destroy();
        }, [], this);  
      }
    }
  }


  // HELPERS
  // =======

  updateScore(){
    this.scoreText.setText(this.score);
  }

  updateAmmonition(){
    if(this.ammonition >= 0){
      this.bullets.children.getArray()[this.ammonition].setVisible(false);
    }
  }

  resetAmmonition(){
    for(var i=0;i<this.ammonition;i++){
      this.bullets.children.getArray()[i].setVisible(true);
    }
  }

  updateCollected(){
    if(this.collected < 4){
      this.apples.children.getArray()[this.collected-1].setVisible(true);
    }
  }

  resetCollected(){
    for(var i=0;i<3;i++){
      this.apples.children.getArray()[i].setVisible(false);
    }
  }

  resetBullet(){
    this.bullet.x = 200;
    this.bullet.y = -50;
    this.bulletActive = false;
  }

  playSound(sound){
    var sound = this.sound.add(sound);
    sound.setLoop(false);
    sound.play();
  }


  // PHASER SCENE STATES
  // ===================

  create() {
    console.log('PlayScene create');

    // RESET PROPERTY VALUES
    this.bulletActive = false;
    this.barrelActive = false;
    this.gameOver = false;
    this.fruitsRemoved = false;
    this.score = 0;
    this.collected = 0;
    this.ammonition = 10;

    // ADD GRAPHICS
    // Tree
    this.add.image(400, -80, 'treeGreen').setScale(2.5,2.5).setDepth(0.9);
    this.add.image(420, 400, 'treeBrown').setScale(2.5,3.5);

    // Barrel
    this.barrel = this.add.image(750, 525, 'barrel');

    // Grass
    this.grass = this.physics.add.staticGroup({
      key: 'grass',
      repeat: 27,
      setXY: { x: 0, y: 590, stepX: 30 }
    });

    // Player    
    this.player = this.physics.add.sprite(400, 550, 'dude',4);
    this.player.setCollideWorldBounds(true);
    
    // Bullet (initially outside of screen)
    this.bullet = this.physics.add.sprite(200,-40,"blueberry");
    
    // Score text
    this.scoreText = this.add.text(730, 530, this.score, { fontSize: '40px', fill: '#FFF' }).setDepth(1);


    // CREATE GROUPS
    // Fruits
    this.fruits = this.physics.add.group();

    // Bullets left
    this.bullets = this.physics.add.group({
      key: 'blueberry',
      repeat: 9,
      setXY: { x: 50, y: 590, stepX: 30 }
    });
    
    // Apples collected
    this.apples = this.physics.add.group({
      key: 'apple',
      repeat: 2,
      setXY: { x: 700, y: 590, stepX: 30 },
    });
    this.resetCollected();


    // CREATE PARTICLE EMITTERS
    // Blueberry
    this.particlesBlueberry = this.add.particles('blueberry');
    this.particlesBlueberry.createEmitter({
      angle: { min: 0, max: 360, steps: 32 },
      lifespan: 1000,
      speed: 400,
      quantity: 32,
      scale: { start: 1, end: 0 },
      on: false
    });
    
    // Apple
    this.particlesApple = this.add.particles('apple');
    this.particlesApple.createEmitter({
      angle: { min: 0, max: 360, steps: 32 },
      lifespan: 1000,
      speed: 400,
      quantity: 32,
      scale: { start: 1, end: 0 },
      on: false
    });


    // DEFINE COLLISIONS
    this.physics.add.overlap(this.fruits, this.player, this.hitPlayer, null, this);
    this.physics.add.collider(this.fruits,this.grass, this.hitGrass, null, this);
    this.physics.add.collider(this.fruits,this.bullet, this.hitFruit, null, this);
    

    // DEFINE ANIMATIONS
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
      frames: this.anims.generateFrameNumbers('splash', { start: 0, end: 7 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 12 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'blood',
      frames: this.anims.generateFrameNumbers('blood', { start: 0, end: 15 }),
      frameRate: 3
    });

    this.music = this.sound.add('theme');
    this.music.play();



    // KEY INPUT
    this.cursors = this.input.keyboard.createCursorKeys();
    this.touch = this.input.activePointer;
  }

  update() {

    // Remove fruits?
    if (this.gameOver && !this.fruitsRemoved){
      console.log('Removing the fruits');
      this.fruitsRemoved = true;
      //this.fruits.destroy();
      //this.fruits.kill();
      var tempArray = this.fruits.children.getArray(); 
      for(var i=0;i<tempArray.length;i++){
        tempArray[i].destroy();
      }
    }

    // Fire a bullet?
    if ((this.cursors.up.isDown || this.touch.isDown) && !this.gameOver) {
      console.log("Up pressed");
      if(!this.bulletActive && this.ammonition > 0) {
          console.log("Bullet shot");
          this.bullet.x = this.player.x;
          this.bullet.y = this.player.y;
          this.bulletActive = true;
          this.bullet.body.velocity.y = -250;
          this.ammonition -= 1;
          this.playSound('fireSound');
          this.updateAmmonition();
      }
    }




    
    // Remove bullet?
    if(this.bulletActive) {
      if(this.bullet.y < 250 || this.gameOver) {
        this.resetBullet();
      }
    }
    
    // Player on barrel?
    if(this.player.x > 745 && !this.barrelActive && !this.gameOver){
      this.particlesBlueberry.emitParticleAt(this.barrel.x, this.barrel.y);
      this.barrelActive = true; 
      this.playSound('barrelSound');
      this.score += this.collected * this.collected;
      this.updateScore();
      this.collected = 0;
      this.resetCollected();
      this.ammonition = 10;
      this.resetAmmonition();
    }else if (this.player.x <= 745){
      this.barrelActive = false;
    }

    // New fruit?
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
      if(this.fruitNum != 1){
        fruit.setBounceY(0.9);
      }
      fruit.setGravityY(100);
    }

    // Update player position
    if (!this.gameOver){
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
      }
    }
  }
}