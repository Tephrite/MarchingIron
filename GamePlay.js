var timeinSec; 
var timer;
var timeText;
var text;
var wave;
var waveInc;
var counter; 
var counter2 = 0;
var score = 0; 
var music;

var v1HP, v2HP, v3HP, v4HP, v5HP, castleHP;
var v1HPInt, v2HPInt, v3HPInt, v4HPInt, v5HPInt, castleHPInt;

var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
    
    friendlyTroop:{
        mob: null,       
    },
    
    village:{
        xDest: null,
        yDest: null,
        
    },
    
    friendly:{
        xDest: null,
        yDest: null,
        
    },
    mob: null,
    
    
  
    preload: function() {
        waveInc = 1;
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        this.load.image('castle', 'Assets/Pictures/CastleOne1.png');
        
        this.load.image('friendly', 'Assets/Pictures/nepoleon blue SMALL.png');
        this.load.image('friendlyInjured', 'Assets/Pictures/napoleon blue damaged SMALL.png');
        this.load.image('enemy', 'Assets/Pictures/nepoleon red SMALL.png');
        
        this.load.image('ui', 'Assets/Pictures/MapOneUI.png');
        this.load.image('villageNeutral', 'Assets/Pictures/SettlementOne1.png');
        this.load.image('villageCaptured', 'Assets/Pictures/SettlementOne2.png');
        this.load.image('villageDestroyed', 'Assets/Pictures/SettlementOne3.png');
       
        this.load.audio('bgMusic', 'Assets/Music/background sound/beethoven_symphony_5_1.ogg');
        this.load.audio('spawnSound', 'Assets/Music/spawnSound1.ogg');
        this.load.audio('damageSound', 'Assets/Music/battleSound1.ogg');
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
        
        friendlySpawn = this.time.addEvent({ delay: 200000, callback: friendlySpawner, callbackScope: this, loop: true});
        enemySpawn = this.time.addEvent({ delay: 40000, callback: enemySpawner, callbackScope: this, loop: true});
        
        game.input.activePointer.capture = true;
        
        self.mob = this.physics.add.group();
        self.friendlyTroop = this.physics.add.group();
        
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
        v3HP = this.add.text(831, 725, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        v4HP = this.add.text(967, 273, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        v5HP = this.add.text(1017, 505, '-').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        castleHP = this.add.text(633, 481, '5').setFontFamily('Stencil').setFontSize(30).setColor('#000000').setDepth(3);
        
        v1HPInt = v2HPInt = v3HPInt = v4HPInt = v5HPInt = 3;
        castleHPInt = 5;
    
    },


    update: function() {
        // Update objects & variables
        var self = this;
        if (game.input.activePointer.isDown){
            //self.friendly.xDest = game.input.activePointer.x;
            //self.friendly.yDest = game.input.activePointer.y;
            //console.log("Cursor\nx: "+game.input.activePointer.x+" y: "+game.input.activePointer.y);
            self.friendly.setDest(game.input.activePointer.x, game.input.activePointer.y);
            //game.scene.stop('GamePlay');
            //game.scene.start('EndScreen');
            
            //music.stop();
            
        }
        self.friendly.on('pointerdown', function () {
            self.friendly.isSelected();
        });
        
        self.friendly.update();
        
        self.mob.children.each(function(enemy, index) {
            if(enemy.closestVillage() == 1){
                enemy.setDest(self.village1.x, self.village1.y);
                enemy.update();
            }
            else if(enemy.closestVillage() == 2){
                enemy.setDest(self.village2.x, self.village2.y);
                enemy.update();
            }
            else if(enemy.closestVillage() == 3){
                enemy.setDest(self.village3.x, self.village3.y);
                enemy.update();
            }
            else if(enemy.closestVillage() == 4){
                enemy.setDest(self.village4.x, self.village4.y);
                enemy.update();
            }
            else if(enemy.closestVillage() == 5){
                enemy.setDest(self.village5.x, self.village5.y);
                enemy.update();
            }
            else {
                enemy.setDest(self.castle.x, self.castle.y);
                enemy.update();
            }
            
            
            //Enemy to Bulding Colliders
            if(v1HP.text === '3' || v1HP.text === '2' || v1HP.text === '1'){
                if(v1HPInt != 0){
                    self.physics.add.collider(enemy, self.village1, function(){ v1HPInt--; v1HP.text = v1HPInt; enemy.destroy(); self.sound.play('damageSound'); console.log("Village 1 Hit: "+v1HPInt+ " HP remaining"); if(v1HPInt == 0){ self.village1.setTexture('villageDestroyed'); } });
                }
            }
            if(v2HP.text === '3' || v2HP.text === '2' || v2HP.text === '1'){
                if(v2HPInt != 0){
                    self.physics.add.collider(enemy, self.village2, function(){ v2HPInt--; v2HP.text = v2HPInt; enemy.destroy(); self.sound.play('damageSound'); console.log("Village 2 Hit: "+v2HPInt+ " HP remaining"); if(v2HPInt == 0){ self.village2.setTexture('villageDestroyed'); } });
                }
            }
            if(v3HP.text === '3' || v3HP.text === '2' || v3HP.text === '1'){
                if(v3HPInt != 0){
                    self.physics.add.collider(enemy, self.village3, function(){ v3HPInt--; v3HP.text = v3HPInt; enemy.destroy(); self.sound.play('damageSound'); console.log("Village 3 Hit: "+v3HPInt+ " HP remaining"); if(v3HPInt == 0){ self.village3.setTexture('villageDestroyed'); } });
                }
            }
            if(v4HP.text === '3' || v4HP.text === '2' || v4HP.text === '1'){
                if(v4HPInt != 0){
                    self.physics.add.collider(enemy, self.village4, function(){ v4HPInt--; v4HP.text = v4HPInt; enemy.destroy(); self.sound.play('damageSound'); console.log("Village 4 Hit: "+v4HPInt+ " HP remaining"); if(v4HPInt == 0){ self.village4.setTexture('villageDestroyed'); } });
                }
            }
            if(v5HP.text === '3' || v5HP.text === '2' || v5HP.text === '1'){
                if(v5HPInt != 0){
                    self.physics.add.collider(enemy, self.village5, function(){ v5HPInt--; v5HP.text = v5HPInt; enemy.destroy(); self.sound.play('damageSound'); console.log("Village 5 Hit: "+v5HPInt+ " HP remaining"); if(v5HPInt == 0){ self.village5.setTexture('villageDestroyed'); } });
                }
            }
            if((v1HPInt <= 0 || v1HP.text === '-') && (v2HPInt <= 0 || v2HP.text==='-') && (v3HPInt <= 0 || v3HP.text==='-') && (v4HPInt <= 0 || v4HP.text==='-') && (v5HPInt <= 0 || v5HP.text==='-')){
                self.physics.add.collider(enemy, self.castle, function(){ castleHPInt--; castleHP.text = castleHPInt; enemy.destroy(); console.log("Castle Hit: "+castleHPInt+" HP remaining"); if(castleHPInt == 0){ game.scene.stop(); game.scene.start("EndScreen"); music.stop();}});
            }
            
            //Enemy to Player Collider
            self.physics.add.collider(self.friendly, enemy, function()
                                      { 
                enemy.destroy(); 
                score = score+1; 
                console.log("Score: "+score); 
                if(self.friendly.getHealth() == 2)
                {
                    self.friendly.setTexture('friendlyInjured');
                }else{
                    //self.friendly.destroy();
                } 
                self.friendly.setHealth(1); 
            });
        });
        
        
        //Friendly to Buildings Collider
        this.physics.add.collider(self.friendly, self.castle, function(){ });
        this.physics.add.collider(self.friendly, self.village1, function(){
            if(v1HP.text === '-'){
                self.village1.setTexture('villageCaptured');
                v1HP.text = v1HPInt;
                self.mob.children.each(function(enemy, index) { enemy.update();});
                }
            });
                
        this.physics.add.collider(self.friendly, self.village2, function(){
            if(v2HP.text === '-'){
                self.village2.setTexture('villageCaptured');
                v2HP.text = v2HPInt;
                self.mob.children.each(function(enemy, index) { enemy.update();});
                }
            });
        
        this.physics.add.collider(self.friendly, self.village3, function(){
            if(v3HP.text === '-'){
                self.village3.setTexture('villageCaptured');
                v3HP.text = v3HPInt;
                self.mob.children.each(function(enemy, index) { enemy.update();});
                }
            });
        
        this.physics.add.collider(self.friendly, self.village4, function(){
            if(v4HP.text === '-'){
                self.village4.setTexture('villageCaptured');
                v4HP.text = v4HPInt;
                self.mob.children.each(function(enemy, index) { enemy.update();});
                }
            });
        this.physics.add.collider(self.friendly, self.village5, function(){
            if(v5HP.text === '-'){
                self.village5.setTexture('villageCaptured');
                v5HP.text = v5HPInt;
                self.mob.children.each(function(enemy, index) { enemy.update();});
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
    //console.log('time: ' + timeinSec +' counter: ' + counter);
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
    var health = 2;
    var selected = false;
    friendly.speed = 120
    friendly.xDest = x;
    friendly.yDest = y;

    friendly.setDest = function(x, y) {
        if(selected == true){
            friendly.xDest = x;
            //console.log("selected");
            friendly.yDest = y;
        }
        else{
            console.log("not Selected");
        }
    };
    
    friendly.setHealth = function(h){
        health = h;
    }
    
    friendly.getHealth = function(){
        return health;
    }

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
        enemy.closestVillage();
        move(self);
        
    }
    
    enemy.closestVillage = function() {
        var self = this;
        var vDistance = 
            [Math.round(Math.sqrt(Math.abs(((game.village1.x - x)^2) + ((game.village1.y - y)^2)))),
            Math.round(Math.sqrt(Math.abs(((game.village2.x - x)^2) + ((game.village2.y - y)^2)))),
            Math.round(Math.sqrt(Math.abs(((game.village3.x - x)^2) + ((game.village3.y - y)^2)))),
            Math.round(Math.sqrt(Math.abs(((game.village4.x - x)^2) + ((game.village4.y - y)^2)))),
            Math.round(Math.sqrt(Math.abs(((game.village5.x - x)^2) + ((game.village5.y - y)^2))))];
        //console.log(x+" -- "+y+"\n");
        //console.log("1. "+vDistance[0]+" 2. "+vDistance[1]+" 3. "+vDistance[2]+" 4. "+vDistance[3]+" 5. "+vDistance[4]);
        var villageSelected = (vDistance.indexOf(Math.min(...vDistance)))+1;
        var villageArray = [];
        var temp;
        

        if(v1HP.text === '3' || v1HP.text === '2' || v1HP.text === '1'){
            villageArray.push(1);
        }
        if(v2HP.text === '3' || v2HP.text === '2' || v2HP.text === '1'){
            villageArray.push(2);
         }
        if(v3HP.text === '3' || v3HP.text === '2' || v3HP.text === '1'){
            villageArray.push(3);
        }
        if(v4HP.text === '3' || v4HP.text === '2' || v4HP.text === '1'){
            villageArray.push(4);
         }
        if(v5HP.text === '3' || v5HP.text === '2' || v5HP.text === '1'){
            villageArray.push(5);
        }
        
        if ((v1HPInt <= 0 || v1HP.text === '-') && (v2HPInt <= 0 || v2HP.text==='-') && (v3HPInt <= 0 || v3HP.text==='-') && (v4HPInt <= 0 || v4HP.text==='-') && (v5HPInt <= 0 || v5HP.text==='-')){
            villageSelected = "castle";
        
        }
        //villageSelected = villageArray[Math.floor(Math.random()*villageArray.length)];
        villageSelected = villageArray[0];
        //console.log("Village "+villageSelected+" has been selected");
        return villageSelected;
    }
    enemy.closestVillage();
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
    this.friendlyTroop.add(Friendly(360, 553, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'}));
    this.friendlyTroop.add(Friendly(983, 334, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'}));
    this.friendlyTroop.add(Friendly(853, 863, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'}));
    this.friendlyTroop.add(Friendly(907, 453, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'}));
    this.friendlyTroop.add(Friendly(535, 500, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicBoots.cur), pointer'}));
    /*this.gameitems = this.physics.add.group();
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
    }*/
}

function enemySpawner(){
    console.log(waveInc);
    console.log(counter2);
    counter2 = 0;
    while(counter2 < waveInc){
            var x = Phaser.Math.RND.between(0, 1280);
            var y = 20
            this.mob.add(Enemy(x, y, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'}));

            x = 10
            y = Phaser.Math.RND.between(0, 800);
            this.mob.add(Enemy(x, y, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'}));
    
            x = Phaser.Math.RND.between(0, 1280);
            y = 785
            this.mob.add(Enemy(x, y, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'}));
    
            x = 1250
            y = Phaser.Math.RND.between(0, 800);
            this.mob.add(Enemy(x, y, this).setDepth(2).setInteractive( { cursor: 'url(Assets/Pictures/basicRifle.cur), pointer'}));
    
            this.mob.children.each(function(enemy, index) {
            enemy.body.immovable = true;
            });
        counter2 = counter2+1;
    }
     
}



// Add scene to list of scenes
myGame.scenes.push(gamePlayState);