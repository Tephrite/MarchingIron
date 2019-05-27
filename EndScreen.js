var endScreenState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function EndScreen(){
        Phaser.Scene.call(this, {key: 'EndScreen'});
    },
  
    preload: function() {
        this.load.image('bgEnd', 'Assets/Pictures/GameOverTwo.png');
        this.load.image('playButton', 'Assets/Pictures/button_play.png', 193, 71);
        this.load.image('exitButton', 'Assets/Pictures/button_exit.png', 193, 71);
        this.load.audio('EndingMusic', 'Assets/Music/background sound/saint_saens_danse_macabre.ogg');
    },

    create: function() {
        console.log("EndScreen");
        let background = this.add.image(640, 400, 'bgEnd');
        this.input.setDefaultCursor( 'url(Assets/Pictures/New-Piskel.cur), pointer');
        
        let playButton = this.add.image(332, 696, 'playButton');
        playButton.setInteractive();
        playButton.once('pointerdown', function(pointer){ 
            game.scene.start('GamePlay');
            music.stop();
            
            });
        
        let exitButton = this.add.image(948, 696, 'exitButton');
        exitButton.setInteractive();
        exitButton.once('pointerdown', function(pointer){ window.close();});
        
        var music= this.sound.add('EndingMusic');
        music.play();
        
        
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(endScreenState);