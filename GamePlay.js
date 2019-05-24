var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
    
    castle:{
        xDest: null,
        yDest: null,
        
    },
    
    village:{
        xDest: null,
        yDest: null,
        
    },
    
    friendly:{
        xDest: null,
        yDest: null,
        
    },
    
  
    preload: function() {
        var time = 'null';

        this.load.image('ui', 'Assets/Pictures/UI.png');
        
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        
        this.load.image('castle', 'Assets/Pictures/CastleOne1.png');
        this.load.image('friendly', 'Assets/Pictures/nepoleon blue.png');
        
        this.load.audio('bgMusic', 'Assets/Music/background sound/beethoven_symphony_5_1.ogg');
    },

    create: function() {
        // Create objects
        var self = this;
        console.log("GamePlay");
        
        var music= this.sound.add('bgMusic');
        music.play();
        
        this.add.image(640, 400, 'bg');
        
        //sprites
        this.castle = this.physics.add.sprite(650, 400, 'castle');
        self.castle.body.immovable = true;
        
        self.friendly = new Friendly(300, 200, self);
        this.add.existing(self.friendly);
        this.physics.add.existing(self.friendly, false);
        
        //self.village = this.add.group();
        //self.village.a
        
        game.input.activePointer.capture = true;
        
        //UI
        this.add.image(640, 400, 'ui');
        cHP = this.add.text(478, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        vHP1 = this.add.text(700, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        vHP2 = this.add.text(960, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        round = this.add.text(1200, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        
        
    },

    update: function() {
        // Update objects & variables
        var self = this;
        if (game.input.activePointer.isDown){
            self.friendly.xDest = game.input.activePointer.x;
            console.log("x: "+game.input.activePointer.x+" y: "+game.input.activePointer.y);
            self.friendly.yDest = game.input.activePointer.y;
            
            self.friendly.setDest(game.input.activePointer.x, game.input.activePointer.y);
            
        }
        
        self.friendly.update();
        this.physics.add.collider(self.friendly, self.castle, function(){ });
        
        
    },

});

function Friendly(x, y, game) {
  var friendly = game.add.sprite(x, y, 'friendly');
  friendly.speed = 80
  friendly.xDest = x;
  friendly.yDest = y;

  friendly.setDest = function(x, y) {
    friendly.xDest = x;
    friendly.yDest = y;
  };

  friendly.update = function() {
    var self = this;
    move(self);

  }
  friendly.stop = function() {
    var self = this;
    self.xDest = self.x;
    self.yDest = self.y;

  }
  return friendly;
}

function move(self){
  if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
    self.body.velocity.x = 0;
  } else if (Math.floor(self.x) < Math.floor(self.xDest)) {
    self.body.velocity.x = self.speed;
  } else if (Math.floor(self.x) > Math.floor(self.xDest)) {
    self.body.velocity.x = -self.speed;
  }
  if (Math.floor(self.y / 10) === Math.floor(self.yDest / 10)) {
    self.body.velocity.y = 0;
  } else if (Math.floor(self.y) < Math.floor(self.yDest)) {
    self.body.velocity.y = self.speed;
  } else if (Math.floor(self.y) > Math.floor(self.yDest)) {
    self.body.velocity.y = -self.speed;
  }
}

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);