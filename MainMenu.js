var mainMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
  
    preload: function() {
        this.load.image('bg', 'Assets/Pictures/Menu.png');
        this.load.image('playButton', 'Assets/Pictures/button_play.png', 193, 71);
        this.load.image('exitButton', 'Assets/Pictures/button_exit.png', 193, 71);
        this.load.audio('MenuMusic', 'Assets/Music/mm_intro.ogg');
    },

    create: function() {
        console.log("MainMenu");
        let background = this.add.image(640, 400, 'bg');
        
        let playButton = this.add.image(640, 300, 'playButton');
        playButton.setInteractive();
        playButton.on('pointerdown', function(pointer){ 
            game.scene.start('GamePlay');
            
            background.visible = false;
            
            playButton.x = 2000;
            playButton.y = 2000;
            
            exitButton.x = 2000;
            exitButton.y = 2000;
            
            music.stop();
            
            });
        
        let exitButton = this.add.image(640, 500, 'exitButton');
        exitButton.setInteractive();
        exitButton.on('pointerdown', function(pointer){ window.close();});
        
        var music= this.sound.add('MenuMusic');
        music.play();
        
        
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);