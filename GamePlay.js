var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
  
    preload: function() {
        this.load.image('ui', 'Assets/Pictures/UI.png');
        this.load.image('bg', 'Assets/Pictures/Map_1.png');
        
        
        
        this.load.audio('bgMusic', 'Assets/Music/background sound/beethoven_symphony_5_1.ogg');
    },

    create: function() {
        // Create objects
        console.log("GamePlay");
        
        this.add.image(640, 400, 'bg');
        this.add.image(640, 400, 'ui');
        
        var music= this.sound.add('bgMusic');
        music.play();
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);