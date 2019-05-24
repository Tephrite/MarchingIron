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

        this.load.image('ui', 'Assets/Pictures/MapOneHealthBars.png');
        
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        
        this.load.image('castle', 'Assets/Pictures/CastleOne1.png');
        this.load.image('friendly', 'Assets/Pictures/nepoleon blue.png');
        this.load.image('villageNeutral', 'Assets/Pictures/SettlementOne1.png');
        this.load.image('villageCaptured', 'Assets/Pictures/SettlementOne2.png');
        this.load.image('villageDestroyed', 'Assets/Pictures/SettlementOne3.png');
        
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
        this.castle = this.physics.add.sprite(640, 417, 'castle');
        self.castle.body.immovable = true;
        
        self.friendly = new Friendly(300, 200, self).setInteractive();
        this.add.existing(self.friendly);
        this.physics.add.existing(self.friendly, false);
        
        self.village1 = new Village(258, 615, self);
        self.village2 = new Village(574, 232, self);
        self.village3 = new Village(834, 677, self);
        self.village4 = new Village(970, 225, self);
        self.village5 = new Village(1024, 455, self);
        
        this.physics.add.existing(self.village1, true);
        this.physics.add.existing(self.village2, true);
        this.physics.add.existing(self.village3, true);
        this.physics.add.existing(self.village4, true);
        this.physics.add.existing(self.village5, true);
        
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
            //self.friendly.xDest = game.input.activePointer.x;
            //self.friendly.yDest = game.input.activePointer.y;
            console.log("Cursor\nx: "+game.input.activePointer.x+" y: "+game.input.activePointer.y);
            self.friendly.setDest(game.input.activePointer.x, game.input.activePointer.y);
            
        }
        self.friendly.on('pointerdown', function () {
            self.friendly.isSelected();
        });
        
        self.friendly.update();
        
        
        this.physics.add.collider(self.friendly, self.castle, function(){ });
        this.physics.add.collider(self.friendly, self.village1, function(){ });
        this.physics.add.collider(self.friendly, self.village2, function(){ });
        this.physics.add.collider(self.friendly, self.village3, function(){ });
        this.physics.add.collider(self.friendly, self.village4, function(){ });
        this.physics.add.collider(self.friendly, self.village5, function(){ });
        
        
    },

});

function Friendly(x, y, game) {
    var friendly = game.add.sprite(x, y, 'friendly');
    var selected = false;
    friendly.speed = 80
    friendly.xDest = x;
    friendly.yDest = y;

    friendly.setDest = function(x, y) {
        if(selected == true){
            friendly.xDest = x;
            console.log("selected");
            friendly.yDest = y;
        }
        else{
            console.log("not Selected");
        }
    };

    friendly.update = function() {
        var self = this;
        move(self);
    }
    
    friendly.isSelected = function(){
        this.setTint(0xff0000);
        selected = true;
    }

    friendly.stop = function() {
        var self = this;
        self.xDest = self.x;
        self.yDest = self.y;
    
        //selected = false;
        //this.clearTint();
        

    }
    return friendly;
}

function Village(x, y, game) {
    var village = game.add.sprite(x, y, 'villageNeutral');
    var health;
    village.xDest = x;
    village.yDest = y;

    village.setDest = function(x, y) {
        village.xDest = x;
        village.yDest = y;
    };

    village.update = function() {
        var self = this;
        
        move(self);
    }
    village.stop = function() {
        var self = this;
        self.xDest = self.x;
        self.yDest = self.y;

    }
    return village;
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