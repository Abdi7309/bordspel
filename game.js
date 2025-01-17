// Phaser Game Setup
window.onload = function () {
  document.body.style.overflow = 'hidden';

  var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      scene: {
          preload: preload,
          create: create,
          update: update
      }
  };
  var game = new Phaser.Game(config);

  function preload() {
    // Load assets
    this.load.image('board', '/images/board.png'); 
    this.load.image('start', '/images/start.png');
    this.load.image('installatie1', '/images/installatie1.png'); 
    this.load.image('installatie2', '/images/installatie2.png'); 
    this.load.image('installatie3', '/images/installatie3.png'); 
    this.load.image('installatie4', '/images/installatie4.png'); 
    this.load.image('installatie5', '/images/installatie5.png'); 

    
    // Load individual tile images
    for (let i = 1; i <= 14; i++) {
        this.load.image(`tile${i}`, `/images/tile${i}.png`);
    }
}
  function create() {
    // Add the game board background
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'board').setScale(1); // Adjust scale as needed

// Top UI section
// Add "Inkoop" and "Verkoop" with green rectangles and bold text
var inkoopPositions = [75, 138, 200]; // X-positions for Inkoop circles
var verkoopPositions = [305, 368, 430]; // X-positions for Verkoop circles

// Function to draw rounded rectangles
function drawRoundedRect(graphics, x, y, width, height, radius, fillColor) {
    graphics.fillStyle(fillColor, 1);
    graphics.fillRoundedRect(x, y, width, height, radius);
    graphics.strokeRoundedRect(x, y, width, height, radius);
}

// Graphics object for rounded rectangles
var graphics = this.add.graphics();
graphics.lineStyle(0, 0x000000, 1); // Set border style

// Add green rounded rectangles for Inkoop and Verkoop
drawRoundedRect(graphics, 40, 35, 200, 80, 0, 0x6ec48e); // Inkoop 
drawRoundedRect(graphics, 270, 35, 200, 80, 0, 0x6ec48e); // Verkoop 

// Add "Inkoop" circles and label
inkoopPositions.forEach((xPos) => {
    this.add.circle(xPos, 75, 25, 0xffffff).setStrokeStyle(0, 0x000000); // Inkoop circles
});
this.add.text(100, 5, 'INKOOP', {
    fontSize: '20px',
    fontStyle: 'bold',
    color: '#3B536F',
    fontFamily: 'Arial',
});

// Add "Verkoop" circles and label
verkoopPositions.forEach((xPos) => {
    this.add.circle(xPos, 75, 25, 0xffffff).setStrokeStyle(0, 0x000000); // Verkoop circles
});
this.add.text(330, 5, 'VERKOOP', {
    fontSize: '20px',
    fontStyle: 'bold',
    color: '#3B536F',
    fontFamily: 'Arial',
});

drawRoundedRect(graphics, 500, 35, 150, 80, 0, 0x57A0D7); // Kas rectangle

// Add text above "Kas" rectangle
this.add.text(555, 5, 'KAS', {
    fontSize: '16px',
    color: '#3B536F',
    fontFamily: 'Arial',
    fontStyle: 'bold',
});

// Add "$500" text inside the Kas rectangle
this.add.text(528, 53, '$500', {
    fontSize: '40px',
    color: '#ffff',
    fontFamily: 'Arial',
});

// Add "Magazijn," "Products," and "Fiches"
var labels = ['MAGAZIJN', 'PRODUCTS', 'FICHES'];
var xOffset = 680;

labels.forEach((label, index) => {
    drawRoundedRect(graphics, xOffset + index * 180, 35, 150, 80, 0, 0x57A0D7);
    this.add.text(xOffset + index * 180 + 30, 5, label, {
        fontSize: '16px',
        fontStyle: 'bold',
        color: '#3B536F',
        fontFamily: 'Arial',
    });
});

      // Add the game board
      this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'board').setScale(1); // Adjust scale as needed

      // Pathway coordinates for "Start" and tiles 1-14
      var tilePositions = [
          { x: 157, y: 320, label: 'Start', width: 140, height: 140 },
          { x: 245, y: 390, label: '1',width: 140, height: 140 },
          { x: 285, y: 515, label: '2',width: 140, height: 140 }, 
          { x: 332, y: 630, label: '3' ,width: 140, height: 140 },
          { x: 450, y: 647, label: '4',width: 140, height: 140 }, 
          { x: 580, y: 646, label: '5',width: 140, height: 140 },
          { x: 628, y: 555, label: '6' ,width: 140, height: 140 },
          { x: 626, y: 425, label: '7' ,width: 140, height: 140 },
          { x: 608, y: 297, label: '8',width: 140, height: 140 },
          { x: 648, y: 190, label: '9',width: 140, height: 140 },
          { x: 774, y: 203, label: '10',width: 140, height: 140 },
          { x: 855, y: 285, label: '11' ,width: 140, height: 140 },
          { x: 880, y: 417, label: '12',width: 140, height: 140 },
          { x: 963, y: 498, label: '13',width: 140, height: 140 },
          { x: 1097, y: 513, label:'14',width: 140, height: 140 }, 
      ];
      
      tilePositions.forEach((tile) => {
        if (tile.label === 'Start') {
            // Set specific width and height for "Start"
            const startImage = this.add.image(tile.x, tile.y, 'start');
            startImage.setDisplaySize(tile.width, tile.height);
        } else {
            // Use the specific tile image for each tile
            var tileKey = `tile${tile.label}`; // e.g., tile1, tile2, tile3, etc.
            const tileImage = this.add.image(tile.x, tile.y, tileKey);
            tileImage.setDisplaySize(tile.width, tile.height);

            // Add text for the tile label
            this.add.text(tile.x - 10, tile.y - 10, tile.label, {
                fontSize: '1px',
                color: '#000',
                fontFamily: 'Arial'
            });
        }
    });

    
// Define dynamic x and y positions for the "Gebeurteniskaarten" box
const boxX = 750; // Custom x position
const boxY = 390; // Custom y position

// Add the "Gebeurteniskaarten" box with rounded corners and rgb(207, 209, 211) color, without borders
var gebeurtenisBox = this.add.graphics();
gebeurtenisBox.fillStyle(0xcfd1d3, 1); // rgb(207, 209, 211) color
gebeurtenisBox.fillRoundedRect(boxX - 65, boxY - 95, 130, 190, 10);

// Add text inside the box
this.add.text(boxX - 54, boxY - 25, 'GEBEURTENIS-\n    KAARTEN', {
    fontSize: '15px',
    fontStyle: 'bold',
    color: '#fff',
    fontFamily: 'Arial'
    
});


      // Add Installations
      var installations = [
          { x: 150, y: 200, label: 'Installatie 1', asset: 'installatie1' }, // Ensure the correct asset key is used
          { x: 150, y: 500, label: 'Installatie 2', asset: 'installatie2' },
          { x: 470, y: 550, label: 'Installatie 3', asset: 'installatie3' },
          { x: 1030, y: 200, label: 'Installatie 4', asset: 'installatie4'},
          { x: 920, y: 600, label: 'Installatie 5', asset: 'installatie5' }
      ];

      installations.forEach((inst) => {
          this.add.image(inst.x, inst.y, inst.asset).setScale(1.1);
          this.add.text(inst.x - 50, inst.y + 105, inst.label, {
              fontSize: '18px',
              color: '#000'
          });
      });

    // Add a #F8B93B rectangle with rounded corners on the right side of the screen
    var rectX = window.innerWidth - 320; // Adjust X position as needed
    var rectY = 10; // Start from the top of the screen
    var rectWidth = 300;
    var rectHeight = window.innerHeight - 30; // Span the entire height of the screen
    var rectRadius = 10; // Adjust the radius for rounded corners

    var rect = this.add.graphics();
    rect.fillStyle(0xF8B93B, 1); // #F8B93B color
    rect.fillRoundedRect(rectX, rectY, rectWidth, rectHeight, rectRadius);

    // Add 5 circles on the top of the rectangle
    var circleRadius = 25; // Match the size of "Inkoop" and "Verkoop" circles
    var circleSpacing = 55;
    for (var i = 0; i < 5; i++) {
        var circleX = rectX + 40 + i * circleSpacing;
        var circleY = rectY + circleRadius + 15;
        this.add.circle(circleX, circleY, circleRadius, 0xffffff).setStrokeStyle(0, 0x000000);
    }

    // Add 3 rectangles on the top of the rectangle
    var smallRectWidth = 45;
    var smallRectHeight = 100;
    var smallRectSpacing = 70; // Define the spacing between small rectangles
    for (var j = 0; j < 3; j++) {
        var smallRectX = rectX + 50 + j * smallRectSpacing; // Adjust X position for the additional rectangles
        var smallRectY = rectY + 80; // Adjust Y position for the additional rectangles
        var smallRect = this.add.graphics();
        smallRect.fillStyle(0xffffff, 1);  
        smallRect.fillRect(smallRectX, smallRectY, smallRectWidth, smallRectHeight);
    }

    // Add 2 rectangles on the top of the rectangle
    var smallRectWidth = 45;
    var smallRectHeight = 100;
    var smallRectSpacing = 70;
    for (var j = 0; j < 2; j++) {
        var smallRectX = rectX + 90 + j * smallRectSpacing; // Adjust X position for the additional rectangles
        var smallRectY = rectY + 190; // Adjust Y position for the additional rectangles
        var smallRect = this.add.graphics();
        smallRect.fillStyle(0xffffff, 1);  
        smallRect.fillRect(smallRectX, smallRectY, smallRectWidth, smallRectHeight);
    }

    // Add 3 more big rectangles under each other
    var bigRectWidth = 250;
    var bigRectHeight = 120;
    var bigRectSpacing = 130;
    for (var k = 0; k < 3; k++) {
        var bigRectX = rectX + 25;
        var bigRectY = rectY + 305 + k * bigRectSpacing;
        var bigRect = this.add.graphics();
        bigRect.fillStyle(0xffffff, 1); 
        bigRect.fillRect(bigRectX, bigRectY, bigRectWidth, bigRectHeight);
    }
  }

  function update() {
      // Game logic updates can go here
  }
};
