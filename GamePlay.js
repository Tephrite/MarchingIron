var timeinSec; 
var timer;
var timeText;
var text;
var wave;
var waveInc;
var counter; 
var score; 
var music;

var v1HP, v2HP, v3HP, v4HP, v5HP, castleHP;


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
        waveInc = 1;
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        this.load.image('castle', 'Assets/Pictures/CastleOne1.png');
        this.load.image('friendly', 'Assets/Pictures/nepoleon blue SMALL.png');
        this.load.image('enemy', 'Assets/Pictures/nepoleonSmall.png');
        this.load.image('ui', 'Assets/Pictures/MapOneUI.png');
        this.load.image('villageNeutral', 'Assets/Pictures/SettlementOne1.png');
        this.load.image('villageCaptured', 'Assets/Pictures/SettlementOne2.png');
        this.load.image('villageDestroyed', 'Assets/Pictures/SettlementOne3.png');
       
        this.load.audio('bgMusic', 'Assets/Music/background sound/beethoven_symphony_5_1.ogg');
        this.load.audio('spawnSound', 'Assets/Music/spawnSound1.ogg');
    },

    create: function() {
        // Create objects
        var self = this;
        console.log("GamePlay");
        
        this.input.setDefaultCursor( 'url(Assets/Pictures/New-Piskel.cur), pointer');
        //this.sound.play('bgMusic');

        
        music= this.sound.add('bgMusic');
        music.play();
        
        var background = this.add.image(640, 400, 'bg').setDepth(1);
        
        //sprites for castle
        this.castle = this.physics.add.sprite(640, 417, 'castle').setDepth(2);
        self.castle.body.immovable = true;
        
         
        //UI
        this.add.image(640, 400, 'ui').setDepth(3);
        
        //sprites for village
        self.village1 = new Village(258, 615, self);
        self.village2 = new Village(574, 232, self);
        self.village3 = new Village(834, 677, self);
        self.village4 = new Village(970, 225, self);
        self.village5 = new Village(1024, 455, self);
        
        this.physics.add.existing(self.village1, true).setDepth(2);
        this.physics.add.existing(self.village2, true).setDepth(2);
        this.physics.add.existing(self.village3, true).setDepth(2);
        this.physics.add.existing(self.village4, true).setDepth(2);
        this.physics.add.existing(self.village5, true).setDepth(2);
        
        //sprites for friendly
        self.friendly = new Friendly(574, 527, self).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(self.friendly).setDepth(2);
        this.physics.add.existing(self.friendly, false);
        
        friendlySpawn = this.time.addEvent({ delay: 40000, callback: friendlySpawner, callbackScope: this, loop: true});
        enemySpawn = this.time.addEvent({ delay: 40000, callback: enemySpawner, callbackScope: this, loop: true});
        
        game.input.activePointer.capture = true;
        
        
        //Creating counter for time to check when time has finished. 
        counter = 0; 
        
        //Setting amount of seconds with this variable. 
        timeinSec = 40;
        
        //Adding time event.
        timer = this.time.addEvent({ delay: 1000, callback: onTimer, callbackScope: this, loop: true});
        
        //Creating text for the ui
        text = this.add.text(985, 15, '00:40').setFontFamily('Stencil').setFontSize(32).setColor('#000000').setDepth(3);
        
        wave = this.add.text(1164, 15, 'Wave 1').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        
        v1HP = this.add.text(250, 663, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        v2HP = this.add.text(569, 279, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        v3HP = this.add.text(967, 273, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        v4HP = this.add.text(1017, 505, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        v5HP = this.add.text(831, 725, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        castleHP = this.add.text(633, 481, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
    
    },


    update: function() {
        // Update objects & variables
        var self = this;
        if (game.input.activePointer.isDown){
            //self.friendly.xDest = game.input.activePointer.x;
            //self.friendly.yDest = game.input.activePointer.y;
            console.log("Cursor\nx: "+game.input.activePointer.x+" y: "+game.input.activePointer.y);
            self.friendly.setDest(game.input.activePointer.x, game.input.activePointer.y);
            //game.scene.stop('GamePlay');
            //game.scene.start('EndScreen');
            
            //music.stop();
            
        }
        self.friendly.on('pointerdown', function () {
            self.friendly.isSelected();
        });
        
        self.friendly.update();
        
        
        this.physics.add.collider(self.friendly, self.castle, function(){ });
        
        this.physics.add.collider(self.friendly, self.village1, function(){
            if(self.village1.getSourceImage = 'villageNeutral'){
                self.village1.setTexture('villageCaptured');
                v1HP.text = '3';
                }
            });
                
        
        this.physics.add.collider(self.friendly, self.village2, function(){
            if(self.village2.getSourceImage = 'villageNeutral'){
                self.village2.setTexture('villageCaptured');
                v2HP.text = '3';
                }
            });
        
        this.physics.add.collider(self.friendly, self.village3, function(){
            if(self.village3.getSourceImage = 'villageNeutral'){
                self.village3.setTexture('villageCaptured');
                v3HP.text = '3';
                }
            });
        
        this.physics.add.collider(self.friendly, self.village4, function(){
            if(self.village4.getSourceImage = 'villageNeutral'){
                self.village4.setTexture('villageCaptured');
                v4HP.text = '3';
                }
            });
        
        this.physics.add.collider(self.friendly, self.village5, function(){
            if(self.village5.getSourceImage = 'villageNeutral'){
                self.village5.setTexture('villageCaptured');
                v5HP.text = '3';
                }
            });
        
        
    },
    
});


function onTimer(){
    //Creating time - implementing the seconds
    timeinSec --;
    if(timeinSec >= 10){
        var timeString = '0:' + timeinSec; 
    }
    else{
        var timeString = '0:0' + timeinSec; 
    }
    
    text.text = timeString;
    console.log('time: ' + timeinSec +' counter: ' + counter);
    counter++;
    
    if (timeinSec == 0)
        {
            
            this.sound.play('spawnSound');
            timeinSec=40;
            waveInc++;
            wave.text = 'Wave ' + waveInc;
            counter = 0;                       
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
    var health = 3;
    
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
        this.add.existing(this.troop1).setDepth(2);
        this.physics.add.existing(this.troop1, false);
        
        this.troop2 = new Friendly(678, 176, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop2).setDepth(2);
        this.physics.add.existing(this.troop2, false);
        
        this.troop3 = new Friendly(983, 334, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop3).setDepth(2);
        this.physics.add.existing(this.troop3, false);
        
        this.troop4 = new Friendly(853, 563, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop4).setDepth(2);
        this.physics.add.existing(this.troop4, false);
        
        this.troop5 = new Friendly(907, 453, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop5).setDepth(2);
        this.physics.add.existing(this.troop5, false);
        
        this.troop6 = new Friendly(535, 500, this).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'});
        this.add.existing(this.troop6).setDepth(2);
        this.physics.add.existing(this.troop6, false);
    }
}

function enemySpawner(){    
    this.gameitems = this.physics.add.group();
    {
        var x = Phaser.Math.RND.between(0, 1280);
        var y = 20
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1).setDepth(2);
        this.physics.add.existing(this.troop1, false);
        
        x = 10
        y = Phaser.Math.RND.between(0, 800);
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1).setDepth(2);
        this.physics.add.existing(this.troop1, false);
        
        x = Phaser.Math.RND.between(0, 1280);
        y = 785
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1).setDepth(2);
        this.physics.add.existing(this.troop1, false);
        
        x = 1250
        y = Phaser.Math.RND.between(0, 800);
                
        this.troop1 = new Enemy(x, y, this).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'});
        this.add.existing(this.troop1).setDepth(2);
        this.physics.add.existing(this.troop1, false);
    }
}



// Add scene to list of scenes
myGame.scenes.push(gamePlayState);