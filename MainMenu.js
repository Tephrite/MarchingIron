var mainMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
  
    preload: function() {
        this.load.image('bgMenu', 'Assets/Pictures/Menu.png');
        this.load.image('playButton', 'Assets/Pictures/button_play.png', 193, 71);
        this.load.image('exitButton', 'Assets/Pictures/button_exit.png', 193, 71);
        this.load.audio('MenuMusic', 'Assets/Music/mm_intro.ogg');
    },

    create: function() {
        console.log("MainMenu");
        let background = this.add.image(640, 400, 'bgMenu');
        this.input.setDefaultCursor( 'url(Assets/Pictures/New-Piskel.cur), pointer');
        
        let playButton = this.add.image(351, 669, 'playButton');
        playButton.setInteractive();
        playButton.once('pointerdown', function(pointer){ 
            game.scene.start('GamePlay');
            music.stop();
            
            });
        
        let exitButton = this.add.image(925, 669, 'exitButton');
        exitButton.setInteractive();
        exitButton.once('pointerdown', function(pointer){ window.close();});
        
        var music= this.sound.add('MenuMusic');
        music.play();
        
        
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);