var timeinSec; 
var timer;
var timeText;
var text;
var wave;
var counter;  

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
        
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        this.load.image('castle', 'Assets/Pictures/CastleOne1.png');
        this.load.image('friendly', 'Assets/Pictures/nepoleon blue SMALL.png');
        this.load.image('enemy', 'Assets/Pictures/nepoleonSmall.png');
        this.load.image('ui', 'Assets/Pictures/MapOneUI.png');
        this.load.image('villageNeutral', 'Assets/Pictures/SettlementOne1.png');
        this.load.image('villageCaptured', 'Assets/Pictures/SettlementOne2.png');
        this.load.image('villageDestroyed', 'Assets/Pictures/SettlementOne3.png');
       
        this.load.audio('bgMusic', 'Assets/Music/background sound/beethoven_symphony_5_1.ogg');
    },

    create: function() {
        // Create objects
        var self = this;
        console.log("GamePlay");
        
        this.input.setDefaultCursor( 'url(Assets/Pictures/New-Piskel.cur), pointer');
        var music= this.sound.add('bgMusic');
        music.play();
        
        var background = this.add.image(640, 400, 'bg');
        
        //sprites for castle
        this.castle = this.physics.add.sprite(640, 417, 'castle');
        self.castle.body.immovable = true;
        
         
        //UI
        this.add.image(640, 400, 'ui');
        
        //sprites for village
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
        
        //sprites for friendly
        self.friendly = new Friendly(574, 527, self).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(self.friendly);
        this.physics.add.existing(self.friendly, false);
        
        friendlySpawn = this.time.addEvent({ delay: 1000, callback: friendlySpawner, callbackScope: this, loop: true});
        enemySpawn = this.time.addEvent({ delay: 1000, callback: enemySpawner, callbackScope: this, loop: true});
        
        game.input.activePointer.capture = true;
        
        
        //Creating variable to hold the score. 
        var score = 0; 
        
        //Creating counter for time to check when time has finished. 
        counter = 0; 
        
        //Setting amount of seconds with this variable. 
        timeinSec = 40;
        
        //Adding time event.
        timer = this.time.addEvent({ delay: 1000, callback: onTimer, callbackScope: this, loop: true});
        
        //Creating text for the ui
        text = this.add.text(985, 15, '00:40').setFontFamily('Stencil').setFontSize(32).setColor('#000000');
        
        wave = this.add.text(1164, 15, 'Wave 1').setFontFamily('Stencil').setFontSize(32).setColor('#000000');
        
        var score = this.add.text(61, 5, 'Score: ').setFontFamily('Stencil').setFontSize(32).setColor('#000000');
        
        //cHP = this.add.text(478, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        //vHP1 = this.add.text(700, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        //vHP2 = this.add.text(960, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        //round = this.add.text(1200, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        
        
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

function onTimer(){
      //Creating time - implementing the seconds
        timeinSec --;
    var timeString = '0:' + timeinSec; 
        text.text = timeString;
            
            counter++;
    
            if (counter == 1 && timeinSec == 0)
            {
                    
                timer.reset(true); 
                wave.text = 'Wave 2';          
            }
    
            if (counter == 2 && timeinSec == 0)
            {
                timer.reset(true);
                wave.text = 'Wave 3';
            }
    
            if (counter == 3 && timeinSec == 0)
            {
                timer.reset(true);
                wave.text = 'Wave 4';
            }
    
            if (counter == 4 && timeinSec == 0)
            {
                timer.reset(true);
                wave.text = 'Wave 5';
            }
    
            if (counter == 5 && timeinSec == 0)
            {
                timer.reset(true);
                wave.text = 'Wave 6';
            }
    
            if (counter == 6 && timeinSec == 0)
            {
                timer.reset(true);
                wave.text = 'Wave 7';
            }
    
            if (counter == 7 && timeinSec == 0)
            {
                timer.reset(true);
                wave.text = 'Wave 8';
            }
    
            if (counter == 8 && timeinSec == 0)
            {
                timer.reset(true);
                wave.text = 'Wave 9';
            }
    
            if(counter === 9)
            {
                timer.remove(false);
            }
        
    }


function Friendly(x, y, game) {
    var friendly = game.add.sprite(x, y, 'friendly');
    //var friendly = game.gameitems.create(x, y, 'friendly');
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
        if(selected == true){
            move(self);
        }
        
    }
    
    friendly.isSelected = function(){
        this.setTint(0xff0000);
        game.input.setDefaultCursor( 'url(Assets/Pictures/basicBoots.cur), pointer');
        selected = true;
    }

    
    return friendly;
}

function Enemy(x, y, game) {
    var enemy = game.add.sprite(x, y, 'enemy');
    //var friendly = game.gameitems.create(x, y, 'friendly');
    var selected = false;
    enemy.speed = 80
    enemy.xDest = x;
    enemy.yDest = y;

    enemy.setDest = function(x, y) {
        enemy.xDest = x;
        enemy.yDest = y;

    };

    enemy.update = function() {
        var self = this;
        move(self);
        
    }
    
    return enemy;
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

function friendlySpawner(){    
    this.gameitems = this.physics.add.group();
    {
    
        this.troop1 = new Friendly(360, 553, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop1);
        this.physics.add.existing(this.troop1, false);
        
        this.troop2 = new Friendly(678, 176, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop2);
        this.physics.add.existing(this.troop2, false);
        
        this.troop3 = new Friendly(983, 334, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop3);
        this.physics.add.existing(this.troop3, false);
        
        this.troop4 = new Friendly(853, 563, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop4);
        this.physics.add.existing(this.troop4, false);
        
        this.troop5 = new Friendly(907, 453, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop5);
        this.physics.add.existing(this.troop5, false);
        
        this.troop6 = new Friendly(535, 500, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop6);
        this.physics.add.existing(this.troop6, false);
    }
}

function enemySpawner(){    
    this.gameitems = this.physics.add.group();
    {
        var x = Phaser.Math.RND.between(0, 1280);
        var y = 20
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1);
        this.physics.add.existing(this.troop1, false);
        
        x = 10
        y = Phaser.Math.RND.between(0, 800);
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1);
        this.physics.add.existing(this.troop1, false);
        
        x = Phaser.Math.RND.between(0, 1280);
        y = 785
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1);
        this.physics.add.existing(this.troop1, false);
        
        x = 1250
        y = Phaser.Math.RND.between(0, 800);
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1);
        this.physics.add.existing(this.troop1, false);
    }
}



// Add scene to list of scenes
myGame.scenes.push(gamePlayState);