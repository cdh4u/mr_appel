const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor: '#FFFFFF',
  physics: {
    default: 'arcade'
  },
  scene: [PreloadScene, StartScene, PlayScene, GameoverScene, InfoScene]
};

window.onload = function() {
  const theGame = new Phaser.Game(config);
  theGame.scene.start('PreloadScene');
};