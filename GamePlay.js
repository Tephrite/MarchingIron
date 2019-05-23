var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
  
    preload: function() {
        var time = 'null';

        this.load.image('ui', 'Assets/Pictures/UI.png');
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        
        this.load.audio('bgMusic', 'Assets/Music/background sound/beethoven_symphony_5_1.ogg');
    },

    create: function() {
        // Create objects
        console.log("GamePlay");
        
        this.add.image(640, 400, 'bg');
        var music= this.sound.add('bgMusic');
        music.play();
        
        
        //UI
        this.add.image(640, 400, 'ui');
        cHP = this.add.text(478, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        vHP1 = this.add.text(700, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        vHP2 = this.add.text(960, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        round = this.add.text(1200, 10, '1').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        
        
    },

    update: function() {
        
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);