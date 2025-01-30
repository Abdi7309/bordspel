window.onload = function () {
  document.body.style.overflow = 'hidden';
  document.body.style.margin = '1px'; 

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
    this.load.image('start', '/images/start.png');
    this.load.image('installatie1', '/images/installatie1.png'); 
    this.load.image('installatie2', '/images/installatie2.png'); 
    this.load.image('installatie3', '/images/installatie3.png'); 
    this.load.image('installatie4', '/images/installatie4.png'); 
    this.load.image('installatie5', '/images/installatie5.png'); 
    this.load.image('background', '/images/background.png'); 


    
    for (let i = 1; i <= 14; i++) {
        this.load.image(`tile${i}`, `/images/tile${i}.png`);
    }
}
  function create() {
//"Inkoop" and "Verkoop" with green RECHTHOEK and bold text
var inkoopPositions = [75, 138, 200]; 
var verkoopPositions = [305, 368, 430]; 

function drawRoundedRect(graphics, x, y, width, height, radius, fillColor) {
    graphics.fillStyle(fillColor, 1);
    graphics.fillRoundedRect(x, y, width, height, radius);
    graphics.strokeRoundedRect(x, y, width, height, radius);
}

var graphics = this.add.graphics();
graphics.lineStyle(0, 0x000000, 0); // Set border style

//groene rechtoek for Inkoop and Verkoop
drawRoundedRect(graphics, 40, 35, 200, 80, 0, 0x6ec48e); // Inkoop 
drawRoundedRect(graphics, 270, 35, 200, 80, 0, 0x6ec48e); // Verkoop 

// "Inkoop" circles and text
inkoopPositions.forEach((xPos) => {
    this.add.circle(xPos, 75, 25, 0xffffff).setStrokeStyle(0, 0x000000); // Inkoop circles
});
this.add.text(100, 5, 'INKOOP', {
    fontSize: '20px',
    fontStyle: 'bold',
    color: '#3B536F',
    fontFamily: 'Arial',
});

// "Verkoop" circles and text
verkoopPositions.forEach((xPos) => {
    this.add.circle(xPos, 75, 25, 0xffffff).setStrokeStyle(0, 0x000000); // Verkoop circles
});
this.add.text(330, 5, 'VERKOOP', {
    fontSize: '20px',
    fontStyle: 'bold',
    color: '#3B536F',
    fontFamily: 'Arial',
});

drawRoundedRect(graphics, 500, 35, 150, 80, 0, 0x57A0D7); // Kas erchthoek

// text above "Kas" rectangle
this.add.text(555, 5, 'KAS', {
    fontSize: '16px',
    color: '#3B536F',
    fontFamily: 'Arial',
    fontStyle: 'bold',
});

// "$500" text in de Kas rechthoek
this.add.text(528, 53, '$500', {
    fontSize: '40px',
    color: '#ffff',
    fontFamily: 'Arial',
});

var labels = ['MAGAZIJN', 'PRODUCTS', 'FICHES'];
var xOffset = 680;

// Track toggle state for each button
var toggles = {};

labels.forEach((label, index) => {
    var graphics = this.add.graphics();
    graphics.fillStyle(0x57A0D7, 1);
    graphics.fillRoundedRect(xOffset + index * 180, 35, 150, 80, 0,);

    // text
    var labelText = this.add.text(xOffset + index * 180 + 30, 5, label, {
        fontSize: '16px',
        fontStyle: 'bold',
        color: '#3B536F',
        fontFamily: 'Arial',
    }).setInteractive({ useHandCursor: true });

    // Initialize toggle state
    toggles[label] = { isToggled: false, rect: null };

    labelText.on('pointerdown', () => {
        const toggle = toggles[label];
        const rectWidth = 1500;
        const rectHeight = 700;
        const rectX = 765; 
        const initialY = window.innerHeight + rectHeight / 2; 
        const targetY = 400; 
    
        if (!toggle.isToggled) {
            toggle.blurBackground = this.add.image(0, 0, 'background') // Replace 'background' with your background texture key
                .setOrigin(0)
                .setDepth(0.5) 
                .setAlpha(1) 

    
            // Apply a blur shader or filter to the background image
            const blurPipeline = this.plugins.get('rexBlurPipeline'); // Assuming RexPlugins or other blur plugin
            toggle.blurBackground.setPipeline('rexBlurPipeline');
    
            // Add the rectangle on top of the blur
            toggle.rect = this.add.graphics().setDepth(2); // Ensure rectangle is above the blur
    
            // Initial draw (off-screen)
            toggle.rect.fillStyle(0xf5f5f5, 1); // Black color with full opacity
            toggle.rect.fillRoundedRect(
                rectX - rectWidth / 2,
                initialY - rectHeight / 2,
                rectWidth,
                rectHeight,
                20
            );
    
            // Tween to move the rectangle on-screen
            this.tweens.add({
                targets: { y: initialY },
                y: targetY,
                duration: 500,
                ease: 'Power2',
                onUpdate: (tween, target) => {
                    // Clear and redraw at the new position
                    toggle.rect.clear();
                    toggle.rect.fillStyle(0xf5f5f5, 1);
                    toggle.rect.fillRoundedRect(
                        rectX - rectWidth / 2,
                        target.y - rectHeight / 2,
                        rectWidth,
                        rectHeight,
                        20
                    );
                },
            });
    
            toggle.isToggled = true;
        } else {
            // Toggle OFF: Remove the blur and rectangle
            const currentY = targetY; // Start at the current position
            const offScreenY = window.innerHeight + rectHeight / 2; // Off-screen position
    
            this.tweens.add({
                targets: { y: currentY },
                y: offScreenY,
                duration: 500,
                ease: 'Power2',
                onUpdate: (tween, target) => {
                    // Clear and redraw at the new position
                    toggle.rect.clear();
                    toggle.rect.fillStyle(0x000000, 1);
                    toggle.rect.fillRoundedRect(
                        rectX - rectWidth / 2,
                        target.y - rectHeight / 2,
                        rectWidth,
                        rectHeight,
                        20
                    );
                },
                onComplete: () => {
                    // Remove the rectangle and blurred background
                    toggle.rect.destroy();
                    toggle.rect = null;
    
                    toggle.blurBackground.destroy();
                    toggle.blurBackground = null;
                },
            });
    
            toggle.isToggled = false;
        }
    });
    
    
    
    
    
    
    
});

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
            const startImage = this.add.image(tile.x, tile.y, 'start');
            startImage.setDisplaySize(tile.width, tile.height);
        } else {
            var tileKey = `tile${tile.label}`; // e.g., tile1, tile2, tile3, etc.
            const tileImage = this.add.image(tile.x, tile.y, tileKey);
            tileImage.setDisplaySize(tile.width, tile.height);

            this.add.text(tile.x - 10, tile.y - 10, tile.label, {
                fontSize: '1px',
                color: '#000',
                fontFamily: 'Arial'
            });
        }
    });

    
// Define dynamic x and y positions for the "Gebeurteniskaarten" box
const boxX = 750; 
const boxY = 390; 


var gebeurtenisBox = this.add.graphics();
gebeurtenisBox.fillStyle(0xcfd1d3, 1); 
gebeurtenisBox.fillRoundedRect(boxX - 65, boxY - 95, 130, 190, 10);

this.add.text(boxX - 54, boxY - 25, 'GEBEURTENIS-\n    KAARTEN', {
    fontSize: '15px',
    fontStyle: 'bold',
    color: '#fff',
    fontFamily: 'Arial'
    
});


      var installations = [
          { x: 150, y: 200, label: 'Installatie 1', asset: 'installatie1' }, 
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

    //rectangle on the right side of the screen
    var rectX = window.innerWidth - 310; 
    var rectY = 10; 
    var rectWidth = 300;
    var rectHeight = window.innerHeight - 30; 
    var rectRadius = 10; 

    var rect = this.add.graphics();
    rect.fillStyle(0xF8B93B, 1); 
    rect.fillRoundedRect(rectX, rectY, rectWidth, rectHeight, rectRadius);

    // 5 circles on the top of that rectangle
    var circleRadius = 25; 
    var circleSpacing = 55;
    for (var i = 0; i < 5; i++) {
        var circleX = rectX + 40 + i * circleSpacing;
        var circleY = rectY + circleRadius + 15;
        this.add.circle(circleX, circleY, circleRadius, 0xffffff).setStrokeStyle(0, 0x000000);
    }

    // 3 rectangles on the top of the rectangle
    var smallRectWidth = 45;
    var smallRectHeight = 100;
    var smallRectSpacing = 70; 
    for (var j = 0; j < 3; j++) {
        var smallRectX = rectX + 50 + j * smallRectSpacing; 
        var smallRectY = rectY + 80; 
        var smallRect = this.add.graphics();
        smallRect.fillStyle(0xffffff, 1);  
        smallRect.fillRect(smallRectX, smallRectY, smallRectWidth, smallRectHeight);
    }

    // 2 rectangles on the top of the rectangle
    var smallRectWidth = 45;
    var smallRectHeight = 100;
    var smallRectSpacing = 70;
    for (var j = 0; j < 2; j++) {
        var smallRectX = rectX + 90 + j * smallRectSpacing; 
        var smallRectY = rectY + 190; 
        var smallRect = this.add.graphics();
        smallRect.fillStyle(0xffffff, 1);  
        smallRect.fillRect(smallRectX, smallRectY, smallRectWidth, smallRectHeight);
    }

    // 3 more big rectangles under each other
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
