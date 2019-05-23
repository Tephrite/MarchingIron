var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
    
    city:{
        xDest: null,
        yDest: null,
        
    },
    
    player:{
        xDest: null,
        yDest: null,
        
    },
    
  
    preload: function() {
        var time = 'null';

        this.load.image('ui', 'Assets/Pictures/UI.png');
        
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        
        this.load.image('city', 'Assets/Pictures/Clickergamecastle.png');
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
        this.city = this.physics.add.sprite(650, 400, 'city').setDisplaySize(300, 300).setSize(100, 100).setOffset(20,40);
        self.city.body.immovable = true;
        
        self.player = this.add.sprite(300, 200, 'friendly');
        this.physics.add.existing(self.player, false);
        
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
            self.player.xDest = game.input.activePointer.x;
            console.log("x: "+game.input.activePointer.x+" y: "+game.input.activePointer.y);
            self.player.yDest = game.input.activePointer.y;
        }
        
        this.physics.add.collider(self.player, self.city, function(){ self.stopPlayer();});
        
        self.movePlayer(game.input.activePointer.x, game.input.activePointer.y);
        
        
    },

    movePlayer: function() {
        var self = this;
        if (Math.floor(self.player.x / 10) == Math.floor(self.player.xDest)){
            self.player.body.velocity.x = 0;
        } else if (Math.floor(self.player.x) < Math.floor(self.player.xDest)){
            self.player.body.velocity.x = 80;
        } else if (Math.floor(self.player.x) > Math.floor(self.player.xDest)){
            self.player.body.velocity.x = -80;
    }
        if (Math.floor(self.player.y / 10) == Math.floor(self.player.yDest)){
            self.player.body.velocity.y = 0;
        } else if (Math.floor(self.player.y) < Math.floor(self.player.yDest)){
            self.player.body.velocity.y = 80;
        } else if (Math.floor(self.player.y) > Math.floor(self.player.yDest)){
            self.player.body.velocity.y = -80;
        }
    },
    
    stopPlayer: function(){
        var self = this;
        self.player.xDest = self.player.x;
        self.player.yDest = self.player.y;
        self.player.body.velocity.x = self.player.body.velocity.y = 0;
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);