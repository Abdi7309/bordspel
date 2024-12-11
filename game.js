window.onload = function() {
  
  var config = {
    type: Phaser.AUTO, // Specify the renderer (AUTO, CANVAS, or WEBGL)
    width: 800,
    height: 600,
    backgroundColor: 0xff0000, // Hexadecimal color
    scene: { // Define at least one scene
      preload: preload,
      create: create
    }
  };
  
  var game = new Phaser.Game(config); // Pass the configuration object to Phaser.Game

  function preload() {
    // Preload assets here
  }

  function create() {
    // Create your game objects here
  }
};
