var mainMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
  
    preload: function() {
        this.load.image('bg', 'Assets/Pictures/Menu.png');
        //this.load.image('playButton', 'Assets/Pictures/button_play.png', 193, 71);
        this.load.image('exitButton', 'Assets/Pictures/button_exit.png');
    },

    create: function() {
        console.log("MainMenu");
        this.add.image(640, 400, 'bg');
        //var button = this.add.button(95, 200, 'playButton', function(){ console.log('play');}, this,0,0,0)
        game.scene.start('GamePlay');
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);