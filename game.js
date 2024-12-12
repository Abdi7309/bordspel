// Phaser Game Setup
window.onload = function () {
  var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xf0f0f0,
      scene: {
          preload: preload,
          create: create,
          update: update
      }
  };

  var game = new Phaser.Game(config);

  function preload() {
      // Load assets
      this.load.image('board', '/images/board.png'); // Replace with actual path
      this.load.image('start', '/images/start.png');
      this.load.image('tile', '/images/tile.png');
  }
  function create() {
    // Add the game board background
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'board').setScale(1); // Adjust scale as needed

    // Top UI section
    // Add "Inkoop" and "Verkoop"
    var inkoopPositions = [50, 100, 150]; // X-positions for Inkoop circles
    var verkoopPositions = [250, 300, 350]; // X-positions for Verkoop circles

    inkoopPositions.forEach((xPos) => {
        this.add.circle(xPos, 75, 20, 0xffffff).setStrokeStyle(2, 0x000000); // Inkoop circles
    });

    verkoopPositions.forEach((xPos) => {
        this.add.circle(xPos, 75, 20, 0xffffff).setStrokeStyle(2, 0x000000); // Verkoop circles
    });

    this.add.text(60, 20, 'INKOOP', { fontSize: '20px', color: '#3B536F', fontFamily: 'Arial' });
    this.add.text(260, 20, 'VERKOOP', { fontSize: '18px', color: '#3B536F', fontFamily: 'Arial' });

    // Add "Kas"
    this.add.rectangle(550, 50, 150, 80, 0xffff00).setStrokeStyle(2, 0x000000);
    this.add.text(380, 40, '$500', { fontSize: '24px', color: '#000', fontFamily: 'Arial' });

    // Add "Magazijn," "Products," and "Fiches"
    var labels = ['Magazijn', 'Products', 'Fiches'];
    var xOffset = 750;

    labels.forEach((label, index) => {
        this.add.rectangle(xOffset + index * 250, 50, 150, 80, 0xffffff).setStrokeStyle(2, 0x000000);
        this.add.text(xOffset + index * 150 - 40, 40, label, {
            fontSize: '16px',
            color: '#000',
            fontFamily: 'Arial'
        });
    });

      // Add the game board
      this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'board').setScale(1); // Adjust scale as needed

      // Pathway coordinates for "Start" and tiles 1-14
      var tilePositions = [
          { x: 100, y: 500, label: 'Start' },
          { x: 200, y: 500, label: '1' },
          { x: 300, y: 500, label: '2' },
          { x: 400, y: 500, label: '3' },
          { x: 500, y: 450, label: '4' },
          { x: 600, y: 400, label: '5' },
          { x: 700, y: 350, label: '6' },
          { x: 800, y: 300, label: '7' },
          { x: 900, y: 250, label: '8' },
          { x: 1000, y: 250, label: '9' },
          { x: 1100, y: 300, label: '10' },
          { x: 1200, y: 350, label: '11' },
          { x: 1300, y: 400, label: '12' },
          { x: 1400, y: 450, label: '13' },
          { x: 1500, y: 500, label: '14' }
      ];

      // Add "Start" and numbered tiles
      tilePositions.forEach((tile) => {
          if (tile.label === 'Start') {
              this.add.image(tile.x, tile.y, 'start').setScale(0.5);
          } else {
              var tileSprite = this.add.image(tile.x, tile.y, 'tile').setScale(0.5);
              this.add.text(tile.x - 10, tile.y - 10, tile.label, {
                  fontSize: '18px',
                  color: '#000',
                  fontFamily: 'Arial'
              });
          }
      });

      // Add the "Gebeurteniskaarten" box
      this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 150, 100, 0xffffff).setStrokeStyle(2, 0x000000);
      this.add.text(window.innerWidth / 2 - 75, window.innerHeight / 2 - 15, 'Gebeurteniskaarten', {
          fontSize: '16px',
          color: '#000',
          fontFamily: 'Arial'
      });

      // Add Installations
      var installations = [
          { x: 150, y: 200, label: 'Installatie 1', asset: 'tile' },
          { x: 150, y: 400, label: 'Installatie 2', asset: 'tile' },
          { x: 400, y: 300, label: 'Installatie 3', asset: 'tile' },
          { x: 750, y: 200, label: 'Installatie 4', asset: 'tile' },
          { x: 900, y: 500, label: 'Installatie 5', asset: 'tile' }
      ];

      installations.forEach((inst) => {
          this.add.image(inst.x, inst.y, inst.asset).setScale(0.5);
          this.add.text(inst.x - 50, inst.y + 50, inst.label, {
              fontSize: '18px',
              color: '#000'
          });
      });
  }

  function update() {
      // Game logic updates can go here
  }
};
