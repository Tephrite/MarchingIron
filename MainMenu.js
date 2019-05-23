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
    },

    create: function() {
        console.log("MainMenu");
        this.add.image(640, 400, 'bg');
        
        let playButton = this.add.image(640, 300, 'playButton');
        playButton.setInteractive();
        playButton.on('pointerdown', function(pointer){ game.scene.load('GamePlay')});
        
        let exitButton = this.add.image(640, 500, 'exitButton');
        exitButton.setInteractive();
        exitButton.on('pointerdown', function(pointer){ window.close();});
        
        game.scene.start('GamePlay');
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);